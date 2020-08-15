/*
 * @Author: KokoTa
 * @Date: 2020-08-12 12:18:22
 * @LastEditTime: 2020-08-15 11:35:02
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
import {onLoadFavoriteData} from './favorite';

const actions = {
  onLoadPopularData,
  onLoadMorePopularData,
  onThemeChange,
  onLoadTrendingData,
  onChangePopularFavorite,
  onChangeTrendingFavorite,
  onLoadFavoriteData,
};

export default actions;
