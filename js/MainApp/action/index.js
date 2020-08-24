/*
 * @Author: KokoTa
 * @Date: 2020-08-12 12:18:22
 * @LastEditTime: 2020-08-24 10:45:22
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
import {onLoadSearchData, onSearchCancel} from './search';

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
  onLoadSearchData,
  onSearchCancel,
};

export default actions;
