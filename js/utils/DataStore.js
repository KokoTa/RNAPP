/*
 * @Author: KokoTa
 * @Date: 2020-08-08 14:57:29
 * @LastEditTime: 2020-08-08 15:27:50
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/utils/DataStore.js
 */

import AsyncStorage from '@react-native-community/async-storage';

export default class DataStore {
  static _wrapData(data) {
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

  static async saveData(url, data, callback) {
    if (!data || !url) {
      return;
    }
    try {
      await AsyncStorage.setItem(
        url,
        JSON.stringify(DataStore._wrapData(data)),
        callback,
      );
      return DataStore._wrapData(data);
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

  static async fetchRemoteData(url) {
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

  static async fetchData(url) {
    const wrapData = await DataStore.fetchLocalData(url);
    // 四个小时内的数据直接使用缓存
    if (wrapData && DataStore._checkTimeValid(wrapData.timestamp)) {
      return wrapData;
    } else {
      // 超过四个小时就使用服务端数据
      const remoteData = await DataStore.fetchRemoteData(url);
      const data = await DataStore.saveData(url, remoteData);
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
