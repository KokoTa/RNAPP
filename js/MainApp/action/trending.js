/*
 * @Author: KokoTa
 * @Date: 2020-08-12 15:48:18
 * @LastEditTime: 2020-08-15 13:59:59
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/trending.js
 */
import DataStore from '../../utils/DataStore';
import Type from './type';

export function onLoadTrendingData(url) {
  return async (dispatch) => {
    dispatch({
      type: Type.TRENDING_REFRESH,
    });
    try {
      const response = await DataStore.fetchData(url, DataStore.DATA_TRENDING);
      dispatch({
        type: Type.TRENDING_REFRESH_SUCCESS,
        items: response.data.items,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: Type.TRENDING_REFRESH_FAIL,
      });
    }
  };
}

/**
 * 改变趋势收藏状态
 * @param {*} item
 * @param {*} isFavorite
 */
export function onChangeTrendingFavorite(item, isFavorite) {
  return (dispatch) => {
    dispatch({
      type: Type.TRENDING_FAVORITE_CHANGE,
      item,
      isFavorite,
    });
  };
}
