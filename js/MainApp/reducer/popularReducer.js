/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-14 16:43:40
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/popularReducer.js
 * @DataSchema:
 * const defaultState = {
 *  java: {
 *    isLoading: false,
 *    isLoadingMore: false,
 *    totalData: [],
 *    items: [],
 *    pageSize: 10,
 *    pageIndex: 1
 *  },
 *  javascript: {
 *    items: [],
 *    isLoading: false,
 *    ...
 *  },
 *  ...
 * }
 */
import Type from '../action/type';

const defaultState = {};

const popularReducer = (state = defaultState, action) => {
  switch (action.type) {
    /**
     * 刷新数据
     */
    case Type.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        },
      };
    case Type.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          isLoading: false,
          totalData: action.totalData, // 原始数据只要赋值一次
          items: action.items, // 被裁剪的数据
          pageSize: action.pageSize,
          pageIndex: action.pageIndex,
        },
      };
    case Type.POPULAR_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      };

    /**
     * 加载更多
     */
    case Type.POPULAR_LOAD_MORE_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoadingMore: true,
        },
      };
    case Type.POPULAR_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoadingMore: false,
          items: action.items,
          pageIndex: action.pageIndex,
        },
      };
    case Type.POPULAR_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };

    /**
     * 改变收藏状态
     */
    case Type.POPULAR_FAVORITE_CHANGE:
      state[action.storeName].items = state[action.storeName].items.map(
        (item) => {
          if (item.html_url === action.item.html_url) {
            item.isFavorite = action.isFavorite;
          }
          return item;
        },
      );
      return {...state};
    default:
      return state;
  }
};

export default popularReducer;
