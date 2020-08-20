import AsyncStorage from '@react-native-community/async-storage';

/*
 * @Author: KokoTa
 * @Date: 2020-08-18 20:41:17
 * @LastEditTime: 2020-08-20 15:20:28
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/utils/LanguageStore.js
 */
import language from '../MainApp/static/language.json';

export default class LanguageStore {
  static async setLanguage(data) {
    await AsyncStorage.setItem('language', JSON.stringify(data));
    return data;
  }

  static async getLanguage() {
    let res = await AsyncStorage.getItem('language');
    if (!res) {
      res = await this.setLanguage(language.language);
    }
    return JSON.parse(res);
  }
}
