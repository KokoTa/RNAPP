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

/*
 * @Author: KokoTa
 * @Date: 2020-08-12 15:29:12
 * @LastEditTime: 2020-08-13 11:42:58
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/TrendingPage.js
 */
function TrendingPage(props) {
  const {trending, theme, onLoadTrendingData} = props;
  const [visible, setVisible] = useState(false);
  const [timeSpan, setTimeSpan] = useState('');

  const loadTotalData = useCallback(
    async (url) => {
      console.log(url);
      await onLoadTrendingData(url);
    },
    [onLoadTrendingData],
  );

  useEffect(() => {
    loadTotalData('https://github.com/trending');
    DeviceEventEmitter.addListener(
      Type.DEVICE_EMIT_TIME_SPAN_CHANGE,
      (span) => {
        loadTotalData(
          'https://github.com/trending' +
            (span.searchText ? `?${span.searchText}` : ''),
        );
        setTimeSpan(span);
      },
    );
    return () => {
      DeviceEventEmitter.removeListener(Type.DEVICE_EMIT_TIME_SPAN_CHANGE);
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
            onRefresh={() => loadTotalData('https://github.com/trending')}
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
