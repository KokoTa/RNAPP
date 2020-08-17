import React, {useEffect, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import {
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  DeviceEventEmitter,
} from 'react-native';
import actions from '../action';
import {FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingItem from '../components/TrendingItem';
import NavigationBar from '../components/NavigationBar';
import TrendingDialog from '../components/TrendingDialog';
import Type from '../action/type';
import EventBus from '../../utils/EventBus';

/*
 * @Author: KokoTa
 * @Date: 2020-08-12 15:29:12
 * @LastEditTime: 2020-08-17 10:45:55
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/TrendingPage.js
 */
function TrendingPage(props) {
  const {trending, theme, onLoadTrendingData} = props;
  const [visible, setVisible] = useState(false);
  const [timeSpan, setTimeSpan] = useState('');

  const loadTotalData = useCallback(async () => {
    await onLoadTrendingData(
      'https://github.com/trending' +
        (timeSpan.searchText ? `?${timeSpan.searchText}` : ''),
    );
  }, [onLoadTrendingData, timeSpan]);

  useEffect(() => {
    loadTotalData();
  }, [loadTotalData]);

  // 改变日期这里会监听到
  useEffect(() => {
    DeviceEventEmitter.addListener(
      Type.DEVICE_EMIT_TIME_SPAN_CHANGE,
      (span) => {
        setTimeSpan(span);
        loadTotalData();
      },
    );
  }, [loadTotalData]);

  // 收藏页状态改变后这里会监听到
  useEffect(() => {
    const fetchData = () => {
      loadTotalData();
    };
    EventBus.getInstance().addListener(
      Type.FAVORITE_TRENDING_CHANGE,
      fetchData,
    );
    return () => {
      EventBus.getInstance().removeListener(fetchData);
    };
  }, [loadTotalData]);

  return (
    <>
      {/* 弹出框 */}
      <TrendingDialog
        visible={visible}
        onClose={() => setVisible(false)}
        // onSelect={(span) => setTimeSpan(span)} // 这里用 emit api 替代
      />
      {/* 导航栏 */}
      <NavigationBar
        titleView={
          <View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => setVisible(true)}>
              <Text style={{fontSize: 20, color: 'white'}}>
                趋势{timeSpan ? `(${timeSpan.showText})` : ''}
              </Text>
              <MaterialIcons
                name="arrow-drop-down"
                size={22}
                style={{color: 'white'}}
              />
            </TouchableOpacity>
          </View>
        }
        style={{backgroundColor: theme.themeColor}}
      />
      {/* 列表 */}
      <FlatList
        data={trending.items}
        renderItem={(params) => (
          <TrendingItem
            item={params.item}
            onSelect={() => {
              console.log('trending item select');
            }}
          />
        )}
        keyExtractor={(params) => params.url}
        refreshControl={
          <RefreshControl
            title="Loading"
            titleColor="red"
            tintColor="orange"
            refreshing={trending.isLoading}
            onRefresh={() => loadTotalData()}
          />
        }
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
  trending: state.trending,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadTrendingData: (url) => dispatch(actions.onLoadTrendingData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);
