/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-10 19:13:22
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/popularReducer.js
 * @DataSchema:
 * popular: {
 *  java: {
 *    items: [],
 *    isLoading: false
 *  },
 *  javascript: {
 *    items: [],
 *    isLoading: false
 *  },
 *  ...
 * }
 */
import Type from '../action/type';

const defaultState = {};

const popularReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          items: [],
          isLoading: true,
        },
      };
    case Type.LOAD_POPULAR_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          items: action.items,
          isLoading: false,
        },
      };
    case Type.LOAD_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]: {
          items: [],
          isLoading: false,
        },
      };
    default:
      return state;
  }
};

export default popularReducer;
