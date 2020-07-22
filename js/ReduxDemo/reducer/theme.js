import Type from '../action/type';

const defaultState = {
  themeColor: 'blue',
};

const themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.THEME_CHANGE:
      return {...state, ...action.theme};
  }
  return state;
};

export default themeReducer;
