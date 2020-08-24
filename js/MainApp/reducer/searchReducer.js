/*
 * @Author: KokoTa
 * @Date: 2020-08-24 10:02:45
 * @LastEditTime: 2020-08-24 10:14:16
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/reducer/searchReducer.js
 */
const {default: Type} = require('../action/type');

const defaultState = {
  items: [],
  isLoading: false,
  showBottomButton: false,
};

const isExist = (popularKeys, keyword) => {
  for (let i = 0; i < popularKeys.length; i++) {
    const key = popularKeys[i].toLowerCase();
    if (key === keyword.toLowerCase()) {
      return true;
    }
  }
  return false;
};

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.SEARCH_REFRESH:
      return {
        ...state,
        isLoading: true,
      };
    case Type.SEARCH_REFRESH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.items,
        showBottomButton: isExist(action.popularKeys, action.keyword),
      };
    case Type.SEARCH_REFRESH_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default searchReducer;
