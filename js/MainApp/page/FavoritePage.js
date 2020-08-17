/*
 * @Author: KokoTa
 * @Date: 2020-08-15 11:01:44
 * @LastEditTime: 2020-08-17 09:51:38
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/FavoritePage.js
 */
import React, {useEffect, useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
import PopularItem from '../components/PopularItem';
import TrendingItem from '../components/TrendingItem';
import {FavoriteStore} from '../../utils/FavoriteStore';
import Type from '../action/type';
import EventBus from '../../utils/EventBus';

function FavoritePage(props) {
  const {favorite, onLoadFavoriteData, storeName} = props;

  const store = favorite[storeName];

  const fetchData = useCallback(async () => {
    await onLoadFavoriteData(storeName);
  }, [onLoadFavoriteData, storeName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 当收藏项更新时会触发
  useEffect(() => {
    EventBus.getInstance().addListener(
      Type.FAVORITE_FAVORITE_CHANGE,
      fetchData,
    );
    EventBus.getInstance().addListener(
      Type.FAVORITE_TRENDING_CHANGE,
      fetchData,
    );
    return () => {
      EventBus.getInstance().removeListener(fetchData);
    };
  }, [fetchData]);

  // 当跳转到收藏页时会触发
  useEffect(() => {
    EventBus.getInstance().addListener(Type.FAVORITE_DATA_REFRESH, fetchData);
    return () => {
      EventBus.getInstance().removeListener(fetchData);
    };
  }, [fetchData, storeName]);

  return (
    <FlatList
      data={store.items}
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
          refreshing={store.isLoading}
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
