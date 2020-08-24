/*
 * @Author: KokoTa
 * @Date: 2020-08-24 09:43:15
 * @LastEditTime: 2020-08-24 12:19:12
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/search.js
 */
import Type from './type';
const tokens = []; // tokens 保存了需要取消的请求名

// 取消请求处理
function hasCancel(token) {
  if (tokens.includes(token)) {
    const index = tokens.indexOf(token);
    token.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * 取消请求
 * @param {*} token 想要取消的请求名
 */
export function onSearchCancel(token) {
  return (dispatch) => {
    tokens.push(token);
    dispatch({
      type: Type.SEARCH_REFRESH_FAIL,
    });
  };
}

/**
 * 获取搜索数据
 * @param {*} keyword 搜索关键词
 * @param {*} popularKeys 最热页关键词列表
 * @param {*} token 请求的唯一名
 */
export function onLoadSearchData(keyword, popularKeys, token) {
  return async (dispatch) => {
    const url = `https://api.github.com/search/repositories?q=${keyword}&sort=stars`;

    dispatch({
      type: Type.SEARCH_REFRESH,
      keyword,
    });

    try {
      // 这里不适用 DataStore，因为该方法会有缓存的效果，而搜索模块是实时性的，不需要缓存
      const res = await fetch(url);
      // 由于 APP 的请求不能像浏览器那样 abort，都会正常发送，因此只能通过不处理 response 的方式来达到 abort 的效果
      const data = hasCancel(token) ? null : await res.json();
      console.log(data);

      if (data) {
        dispatch({
          type: Type.SEARCH_REFRESH_SUCCESS,
          keyword,
          popularKeys,
          items: data && data.items,
        });
      } else {
        dispatch({
          type: Type.SEARCH_REFRESH_FAIL,
          keyword,
        });
      }
    } catch (error) {
      dispatch({
        type: Type.SEARCH_REFRESH_FAIL,
        keyword,
      });
    }
  };
}
