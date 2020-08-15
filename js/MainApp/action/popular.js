import Type from './type';
import DataStore from '../../utils/DataStore';

/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:35:53
 * @LastEditTime: 2020-08-15 13:59:47
 * @LastEditors: KokoTa
 * @Description: 获取最热数据的异步 action
 * @FilePath: /AwesomeProject/js/MainApp/action/popular.js
 */
/**
 * 获取总数据
 * @param {*} storeName
 * @param {*} url
 * @param {*} pageSize
 */
export function onLoadPopularData(storeName, url, pageSize) {
  return async (dispatch) => {
    dispatch({
      type: Type.POPULAR_REFRESH,
      storeName,
    });

    try {
      const data = await DataStore.fetchData(url, DataStore.DATA_HOT);
      dispatch({
        type: Type.POPULAR_REFRESH_SUCCESS,
        storeName,
        totalData: data && data.data && data.data.items,
        items: data && data.data && data.data.items.slice(0, pageSize),
        pageSize,
        pageIndex: 1,
      });
    } catch (error) {
      dispatch({
        type: Type.POPULAR_REFRESH_FAIL,
        storeName,
      });
    }
  };
}

/**
 * 给总数据做切分，每次加载十条
 * @param {*} storeName 分类名
 * @param {*} pageIndex 页码
 * @param {*} pageSize 每页数量
 * @param {*} totalData 原始数据
 * @param {*} callback 回调
 */
export function onLoadMorePopularData(
  storeName,
  pageIndex,
  pageSize,
  totalData = [],
  callback,
) {
  return (dispatch) => {
    dispatch({
      type: Type.POPULAR_LOAD_MORE_REFRESH,
      storeName,
    });

    // 已经加载完数据了
    if ((pageIndex - 1) * pageSize >= totalData.length) {
      if (typeof callback === 'function') {
        callback('no more');
      }
      dispatch({
        type: Type.POPULAR_LOAD_MORE_FAIL,
        storeName,
        pageIndex: pageIndex - 1,
      });
    } else {
      // 显示的最大数据量
      let max =
        pageIndex * pageSize >= totalData.length
          ? totalData.length
          : pageIndex * pageSize;
      setTimeout(() => {
        dispatch({
          type: Type.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          items: totalData.slice(0, max),
        });
      }, 3000);
    }
  };
}

/**
 * 改变最热收藏状态
 * @param {*} storeName
 * @param {*} item
 * @param {*} isFavorite
 */
export function onChangePopularFavorite(storeName, item, isFavorite) {
  return (dispatch) => {
    dispatch({
      type: Type.POPULAR_FAVORITE_CHANGE,
      storeName,
      item,
      isFavorite,
    });
  };
}
