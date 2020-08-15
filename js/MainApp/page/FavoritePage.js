/*
 * @Author: KokoTa
 * @Date: 2020-08-15 11:01:44
 * @LastEditTime: 2020-08-15 14:18:55
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

function FavoritePage(props) {
  const {favorite, onLoadFavoriteData, storeName} = props;

  const fetchData = useCallback(async () => {
    await onLoadFavoriteData(storeName);
  }, [onLoadFavoriteData, storeName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <FlatList
      data={favorite[storeName].items}
      renderItem={(params) =>
        storeName === FavoriteStore.FAVORITE_HOT ? (
          <PopularItem
            item={params.item}
            onSelect={() => {
              console.log('popular item select');
            }}
          />
        ) : (
          <TrendingItem
            item={params.item}
            onSelect={() => {
              console.log('trending item select');
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
