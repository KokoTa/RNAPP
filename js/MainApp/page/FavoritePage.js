/*
 * @Author: KokoTa
 * @Date: 2020-08-15 11:01:44
 * @LastEditTime: 2020-08-15 15:47:26
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/FavoritePage.js
 */
import React, {useEffect, useCallback} from 'react';
import {FlatList, RefreshControl, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import PopularItem from '../components/PopularItem';
import TrendingItem from '../components/TrendingItem';
import {FavoriteStore} from '../../utils/FavoriteStore';
import Type from '../action/type';

function FavoritePage(props) {
  const {favorite, onLoadFavoriteData, storeName} = props;

  const fetchData = useCallback(async () => {
    await onLoadFavoriteData(storeName);
  }, [onLoadFavoriteData, storeName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 当收藏项更新时会触发
  useEffect(() => {
    DeviceEventEmitter.addListener(Type.FAVORITE_FAVORITE_CHANGE, () => {
      fetchData();
    });
    return () => {
      DeviceEventEmitter.removeListener(Type.FAVORITE_FAVORITE_CHANGE);
    };
  }, [fetchData]);

  // 当跳转到收藏页时会触发
  useEffect(() => {
    DeviceEventEmitter.addListener(Type.FAVORITE_DATA_REFRESH, () => {
      fetchData();
    });
    return () => {
      DeviceEventEmitter.removeListener(Type.FAVORITE_DATA_REFRESH);
    };
  }, [fetchData]);

  return (
    <FlatList
      data={favorite[storeName].items}
      renderItem={(params) =>
        storeName === FavoriteStore.FAVORITE_HOT ? (
          <PopularItem
            item={params.item}
            isFavoritePage={true}
            onSelect={() => {
              console.log('favorite item select');
            }}
          />
        ) : (
          <TrendingItem
            item={params.item}
            isFavoritePage={true}
            onSelect={() => {
              console.log('favorite item select');
            }}
          />
        )
      }
      keyExtractor={(params) => params.url}
      refreshControl={
        <RefreshControl
          title="Loading"
          titleColor="red"
          tintColor="orange"
          refreshing={favorite[storeName].isLoading}
          onRefresh={() => fetchData()}
        />
      }
    />
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
  favorite: state.favorite,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavoriteData: (flag) => dispatch(actions.onLoadFavoriteData(flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);
