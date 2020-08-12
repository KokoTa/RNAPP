/*
 * @Author: KokoTa
 * @Date: 2020-08-12 12:18:22
 * @LastEditTime: 2020-08-12 14:03:51
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/index.js
 */
import {onLoadPopularData, onLoadMorePopularData} from './popular';
import {onThemeChange} from './theme';

const actions = {
  onLoadPopularData,
  onLoadMorePopularData,
  onThemeChange,
};

export default actions;
