/*
 * @Author: KokoTa
 * @Date: 2020-08-08 14:57:29
 * @LastEditTime: 2020-08-14 16:42:14
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/utils/DataStore.js
 */

import AsyncStorage from '@react-native-community/async-storage';
import GithubTrending from 'GitHubTrending';
import {FavoriteStore, FAVORITE_HOT, FAVORITE_TRENDING} from './FavoriteStore';

export default class DataStore {
  static async _wrapData(data, flag) {
    // 获取的数据需要判断是否已经收藏，加上收藏状态
    const keys = await FavoriteStore.getKeys(
      flag === 'hot' ? FAVORITE_HOT : FAVORITE_TRENDING,
    );
    data.items = await Promise.all(
      data.items.map(async (item) => {
        const isFavorite = await FavoriteStore.checkItemInKeys(keys, item);
        item.isFavorite = isFavorite;
        return item;
      }),
    );
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
      const wrapData = await DataStore._wrapData(data, flag);
      await AsyncStorage.setItem(url, JSON.stringify(wrapData));
      return wrapData;
    } catch (error) {
      throw Error(error);
    }
  }

  static async fetchLocalData(url, flag) {
    try {
      const data = await AsyncStorage.getItem(url);
      const parseData = JSON.parse(data);
      try {
        return (
          parseData &&
          parseData.data &&
          DataStore._wrapData(parseData.data, flag)
        );
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
    const wrapData = await DataStore.fetchLocalData(url, flag);
    // 四个小时内的数据直接使用缓存
    if (wrapData && DataStore._checkTimeValid(wrapData.timestamp)) {
      return wrapData;
    } else {
      // 超过四个小时就使用服务端数据
      const remoteData = await DataStore.fetchRemoteData(url, flag);
      const data = await DataStore.saveData(url, remoteData, flag);
      return data;
    }
  }

  static async clearData(url) {
    try {
      await AsyncStorage.removeItem(url);
    } catch (error) {
      throw Error(error);
    }
  }
}
