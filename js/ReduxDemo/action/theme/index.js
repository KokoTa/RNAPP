import Type from '../type';

function onThemeSyncChange(theme) {
  return {
    type: Type.THEME_CHANGE,
    theme,
  };
}

export function onThemeChange(theme) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(onThemeSyncChange(theme));
    }, 3000);
  };
}
