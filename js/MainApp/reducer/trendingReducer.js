/*
 * @Author: KokoTa
 * @Date: 2020-08-12 15:30:26
 * @LastEditTime: 2020-08-12 16:13:56
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/trendingReducer.js
 */
import Type from '../action/type';

const defaultState = {
  isLoading: false,
  items: [],
};

const trendingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.TRENDING_REFRESH:
      return {...state, isLoading: true};
    case Type.TRENDING_REFRESH_SUCCESS:
      return {...state, isLoading: false, items: action.items};
    case Type.TRENDING_REFRESH_FAIL:
      return {...state, isLoading: false};
    default:
      return state;
  }
};

export default trendingReducer;
