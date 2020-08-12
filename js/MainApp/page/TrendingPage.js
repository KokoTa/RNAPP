import React, {useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {RefreshControl} from 'react-native';
import actions from '../action';
import {FlatList} from 'react-native-gesture-handler';
import TrendingItem from '../components/TrendingItem';
import NavigationBar from '../components/NavigationBar';

/*
 * @Author: KokoTa
 * @Date: 2020-08-12 15:29:12
 * @LastEditTime: 2020-08-12 19:04:51
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/TrendingPage.js
 */
function TrendingPage(props) {
  const {trending, theme, onLoadTrendingData} = props;

  const loadTotalData = useCallback(
    async (url) => {
      await onLoadTrendingData(url);
    },
    [onLoadTrendingData],
  );

  useEffect(() => {
    loadTotalData('https://github.com/trending');
  }, [loadTotalData]);

  return (
    <>
      <NavigationBar title="趋势" style={{backgroundColor: theme.themeColor}} />
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
