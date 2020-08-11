import Type from '../type';
import DataStore from '../../../utils/DataStore';

/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:35:53
 * @LastEditTime: 2020-08-10 17:54:44
 * @LastEditors: KokoTa
 * @Description: 获取最热数据的异步 action
 * @FilePath: /AwesomeProject/js/MainApp/action/popular/index.js
 */
export function onLoadPopularData(storeName, url) {
  return async (dispatch) => {
    dispatch({
      type: Type.POPULAR_REFRESH,
      storeName,
    });

    try {
      const data = await DataStore.fetchData(url);
      dispatch({
        type: Type.LOAD_POPULAR_SUCCESS,
        storeName,
        items: data && data.data && data.data.items,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: Type.LOAD_POPULAR_FAIL,
        storeName,
      });
    }
  };
}
