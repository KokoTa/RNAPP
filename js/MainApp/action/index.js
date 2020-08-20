/*
 * @Author: KokoTa
 * @Date: 2020-08-12 12:18:22
 * @LastEditTime: 2020-08-20 15:14:42
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/action/index.js
 */
import {
  onLoadPopularData,
  onLoadMorePopularData,
  onChangePopularFavorite,
} from './popular';
import {onChangeThemeColor, onLoadThemeColor} from './theme';
import {onLoadTrendingData, onChangeTrendingFavorite} from './trending';
import {onLoadFavoriteData} from './favorite';
import {onLoadLanguage} from './language';

const actions = {
  onLoadPopularData,
  onLoadMorePopularData,
  onChangeThemeColor,
  onLoadThemeColor,
  onLoadTrendingData,
  onChangePopularFavorite,
  onChangeTrendingFavorite,
  onLoadFavoriteData,
  onLoadLanguage,
};

export default actions;
