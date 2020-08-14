/*
 * @Author: KokoTa
 * @Date: 2020-08-12 12:18:22
 * @LastEditTime: 2020-08-14 14:02:08
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/index.js
 */
import {
  onLoadPopularData,
  onLoadMorePopularData,
  onChangePopularFavorite,
} from './popular';
import {onThemeChange} from './theme';
import {onLoadTrendingData, onChangeTrendingFavorite} from './trending';

const actions = {
  onLoadPopularData,
  onLoadMorePopularData,
  onThemeChange,
  onLoadTrendingData,
  onChangePopularFavorite,
  onChangeTrendingFavorite,
};

export default actions;
