/*
 * @Author: KokoTa
 * @Date: 2020-08-19 09:38:44
 * @LastEditTime: 2020-08-19 14:46:11
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/language.js
 */
import LanguageStore from '../../utils/LanguageStore';
import Type from './type';

export function onLoadLanguage() {
  return async (dispatch) => {
    const language = await LanguageStore.getLanguage();
    dispatch({
      type: Type.LANGUAGE_TABS_LOAD_SUCCESS,
      language,
    });
  };
}
