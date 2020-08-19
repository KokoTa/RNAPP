import AsyncStorage from '@react-native-community/async-storage';

/*
 * @Author: KokoTa
 * @Date: 2020-08-18 20:41:17
 * @LastEditTime: 2020-08-19 10:07:54
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/utils/LanguageStore.js
 */
import language from '../MainApp/static/language.json';

export default class LanguageStore {
  static async setLanguage() {
    const res = await AsyncStorage.setItem(
      'language',
      JSON.stringify(language),
    );
    return res;
  }

  static async getLanguage() {
    let res = await AsyncStorage.getItem('language');
    if (!res) {
      res = await this.setLanguage();
    }
    return JSON.parse(res);
  }
}
