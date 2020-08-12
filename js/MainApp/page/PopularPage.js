/*
 * @Author: KokoTa
 * @Date: 2020-08-10 19:14:15
 * @LastEditTime: 2020-08-12 19:15:19
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/PopularPage.js
 */

import React, {useEffect, useCallback} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import PopularItem from '../components/PopularItem';
import Toast from 'react-native-root-toast';

const defaultPageSize = 10;

const PopularPage = (props) => {
  const {onLoadPopularData, onLoadMorePopularData, storeName, popular} = props;

  let store = popular[storeName] || {};

  // 获取总数据
  const loadData = useCallback(
    (key, size, isLoading) => {
      if (isLoading) {
        return;
      }
      const url = `https://api.github.com/search/repositories?q=${key}&sort=stars`;
      onLoadPopularData(key, url, size);
    },
    [onLoadPopularData],
  );

  // 加载更多切片数据
  const loadMore = useCallback(
    (name, index, size, totalData, isLoadingMore) => {
      if (isLoadingMore) {
        return;
      }
      onLoadMorePopularData(name, index, size, totalData, () =>
        Toast.show('没有更多数据啦！', {
          position: Toast.positions.CENTER,
        }),
      );
    },
    [onLoadMorePopularData],
  );

  // 首次加载获取总数据
  useEffect(() => {
    loadData(storeName, defaultPageSize);
  }, [loadData, storeName]);

  return (
    <FlatList
      data={store.items}
      renderItem={(params) => (
        <PopularItem
          item={params.item}
          onSelect={() => {
            console.log('popular item select');
          }}
        />
      )}
      keyExtractor={(params) => params.id + ''}
      refreshControl={
        <RefreshControl
          title="Loading"
          titleColor="red"
          tintColor="orange"
          refreshing={store.isLoading}
          onRefresh={() => loadData(storeName, defaultPageSize)}
        />
      }
      onEndReachedThreshold={0.2}
      onEndReached={() =>
        loadMore(
          storeName,
          ++store.pageIndex,
          store.pageSize,
          store.totalData,
          store.isLoadingMore,
        )
      }
      ListFooterComponent={() =>
        store.isLoadingMore ? (
          <View>
            <ActivityIndicator color="orange" style={{marginBottom: 5}} />
            <Text style={{textAlign: 'center'}}>正在加载更多...</Text>
          </View>
        ) : null
      }
    />
  );
};

const mapStateToProps = (state) => ({
  popular: state.popular,
  theme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadPopularData: (storeName, url, pageSize) =>
    dispatch(actions.onLoadPopularData(storeName, url, pageSize)),
  onLoadMorePopularData: (
    storeName,
    pageIndex,
    pageSize,
    totalData,
    callback,
  ) =>
    dispatch(
      actions.onLoadMorePopularData(
        storeName,
        pageIndex,
        pageSize,
        totalData,
        callback,
      ),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage);
