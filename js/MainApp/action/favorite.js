/*
 * @Author: KokoTa
 * @Date: 2020-08-15 11:12:14
 * @LastEditTime: 2020-08-15 14:05:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/favorite.js
 */
import Type from './type';
import {FavoriteStore} from '../../utils/FavoriteStore';

/**
 * 加载收藏数据
 * @param {*} storeName
 */
export function onLoadFavoriteData(storeName) {
  return async (dispatch) => {
    dispatch({
      type: Type.FAVORITE_LOAD,
      storeName,
    });

    try {
      const data = await FavoriteStore.getItems(storeName);
      dispatch({
        type: Type.FAVORITE_LOAD_SUCCESS,
        storeName,
        items: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: Type.FAVORITE_LOAD_FAIL,
        storeName,
      });
    }
  };
}
