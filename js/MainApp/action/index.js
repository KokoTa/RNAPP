/*
 * @Author: KokoTa
 * @Date: 2020-08-12 12:18:22
 * @LastEditTime: 2020-08-12 15:52:06
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/index.js
 */
import {onLoadPopularData, onLoadMorePopularData} from './popular';
import {onThemeChange} from './theme';
import {onLoadTrendingData} from './trending';

const actions = {
  onLoadPopularData,
  onLoadMorePopularData,
  onThemeChange,
  onLoadTrendingData,
};

export default actions;
