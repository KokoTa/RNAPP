/*
 * @Author: KokoTa
 * @Date: 2020-08-20 14:44:21
 * @LastEditTime: 2020-08-20 15:21:31
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/utils/ThemeColorStore.js
 */

import AsyncStorage from '@react-native-community/async-storage';
import themeColor from '../MainApp/static/themeColor.json';

export default class ThemeColorStore {
  static async setThemeColor(color) {
    await AsyncStorage.setItem('themeColor', color);
    return color;
  }

  static async getThemeColor() {
    let res = await AsyncStorage.getItem('themeColor');
    if (!res) {
      res = await this.setThemeColor(themeColor.Default);
    }
    return res;
  }
}
