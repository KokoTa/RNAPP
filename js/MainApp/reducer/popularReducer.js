/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-12 15:33:07
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
    default:
      return state;
  }
};

export default popularReducer;
