/*
 * @Author: KokoTa
 * @Date: 2020-08-10 19:14:15
 * @LastEditTime: 2020-08-17 09:12:53
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
import NavigationStore from '../../utils/NavigationStore';
import Type from '../action/type';
import EventBus from '../../utils/EventBus';

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

  // 收藏页状态改变后这里会监听到
  useEffect(() => {
    const fetchData = () => {
      loadData(storeName, defaultPageSize, store.isLoading);
    };
    EventBus.getInstance().addListener(
      Type.FAVORITE_FAVORITE_CHANGE,
      fetchData,
    );
    return () => {
      EventBus.getInstance().removeListener(fetchData);
    };
  }, [loadData, storeName, store.isLoading]);

  return (
    <FlatList
      data={store.items}
      renderItem={(params) => (
        <PopularItem
          item={params.item}
          storeName={storeName}
          onSelect={() => {
            console.log('popular item select');
            NavigationStore.navigation &&
              NavigationStore.navigation.navigate('DetailPage', {
                storeName,
                ...params.item,
              });
          }}
        />
      )}
      keyExtractor={(params) => params.id + Math.random() + ''}
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
