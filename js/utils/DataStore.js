/*
 * @Author: KokoTa
 * @Date: 2020-08-08 14:57:29
 * @LastEditTime: 2020-08-14 14:22:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/utils/DataStore.js
 */

import AsyncStorage from '@react-native-community/async-storage';
import GithubTrending from 'GitHubTrending';
import {FavoriteStore, FAVORITE_HOT, FAVORITE_TRENDING} from './FavoriteStore';

export default class DataStore {
  static _wrapData(data, flag) {
    // 获取的数据需要判断是否已经收藏，加上收藏状态
    data.items.forEach(async (item) => {
      const isFavorite = await FavoriteStore.checkItemInKeys(
        flag === 'hot' ? FAVORITE_HOT : FAVORITE_TRENDING,
        item,
      );
      item.isFavorite = isFavorite;
    });
    return {data, timestamp: new Date().getTime()};
  }

  static _checkTimeValid(timestamp) {
    const nowDate = new Date();
    const localDate = new Date(timestamp);
    if (nowDate.getFullYear() !== localDate.getFullYear()) {
      return false;
    }
    if (nowDate.getMonth() !== localDate.getMonth()) {
      return false;
    }
    if (nowDate.getDate() !== localDate.getDate()) {
      return false;
    }
    if (nowDate.getHours() - localDate.getHours() > 4) {
      return false;
    }
    return true;
  }

  static async saveData(url, data, flag) {
    if (!data || !url) {
      return;
    }
    try {
      const wrapData = DataStore._wrapData(data, flag);
      await AsyncStorage.setItem(url, JSON.stringify(wrapData));
      return wrapData;
    } catch (error) {
      throw Error(error);
    }
  }

  static async fetchLocalData(url) {
    try {
      const data = await AsyncStorage.getItem(url);
      try {
        return JSON.parse(data);
      } catch (error) {
        throw Error(error);
      }
    } catch (err) {
      throw Error(err);
    }
  }

  static async fetchRemoteData(url, flag) {
    if (flag === 'hot') {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return response.json();
        }
        throw Error('Response not ok');
      } catch (error) {
        throw Error(error);
      }
    }
    if (flag === 'trending') {
      try {
        const response = await new GithubTrending(
          'fd82d1e882462e23b8e88aa82198f166',
        ).fetchTrending(url);
        if (!response) {
          throw Error('Response is null');
        }
        return {items: response};
      } catch (error) {
        throw Error(error);
      }
    }
  }

  /**
   * 获取数据
   * @param {*} url 地址
   * @param {*} flag 最热或趋势
   */
  static async fetchData(url, flag) {
    // const wrapData = await DataStore.fetchLocalData(url);
    // 四个小时内的数据直接使用缓存
    // if (wrapData && DataStore._checkTimeValid(wrapData.timestamp)) {
    //   return wrapData;
    // } else {
    // 超过四个小时就使用服务端数据
    const remoteData = await DataStore.fetchRemoteData(url, flag);
    const data = await DataStore.saveData(url, remoteData, flag);
    return data;
    // }
  }

  static async clearData(url) {
    try {
      await AsyncStorage.removeItem(url);
    } catch (error) {
      throw Error(error);
    }
  }
}
