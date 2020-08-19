/*
 * @Author: KokoTa
 * @Date: 2020-08-12 12:18:22
 * @LastEditTime: 2020-08-19 14:44:43
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
import {onLoadLanguage} from './language';

const actions = {
  onLoadPopularData,
  onLoadMorePopularData,
  onThemeChange,
  onLoadTrendingData,
  onChangePopularFavorite,
  onChangeTrendingFavorite,
  onLoadFavoriteData,
  onLoadLanguage,
};

export default actions;
