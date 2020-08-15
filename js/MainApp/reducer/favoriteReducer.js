/*
 * @Author: KokoTa
 * @Date: 2020-08-15 11:51:04
 * @LastEditTime: 2020-08-15 14:06:17
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/favoriteReducer.js
 */
import Type from '../action/type';
import {FavoriteStore} from '../../utils/FavoriteStore';

const defaultState = {
  [FavoriteStore.FAVORITE_HOT]: {
    items: [],
    isLoading: false,
  },
  [FavoriteStore.FAVORITE_TRENDING]: {
    items: [],
    isLoading: false,
  },
};

export default function favoriteReducer(state = defaultState, action) {
  switch (action.type) {
    case Type.FAVORITE_LOAD:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        },
      };
    case Type.FAVORITE_LOAD_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items,
          isLoading: false,
        },
      };
    case Type.FAVORITE_LOAD_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      };
    default:
      return state;
  }
}
