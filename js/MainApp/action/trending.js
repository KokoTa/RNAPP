/*
 * @Author: KokoTa
 * @Date: 2020-08-12 15:48:18
 * @LastEditTime: 2020-08-14 14:03:41
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
      const response = await DataStore.fetchData(url, 'trending');
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
