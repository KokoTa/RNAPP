/*
 * @Author: KokoTa
 * @Date: 2020-08-12 15:48:18
 * @LastEditTime: 2020-08-12 16:14:22
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
        items: response.data,
      });
    } catch (error) {
      dispatch({
        type: Type.TRENDING_REFRESH_FAIL,
      });
    }
  };
}
