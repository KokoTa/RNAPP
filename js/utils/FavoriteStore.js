/*
 * @Author: KokoTa
 * @Date: 2020-08-13 20:30:26
 * @LastEditTime: 2020-08-15 15:41:54
 * @LastEditors: KokoTa
 * @Description: 收藏工具类：保存的每个项目都有个项目名，项目名保存到收藏集合中，每次新增或删除项目后需要更新收藏集合中的项目名
 * @FilePath: /AwesomeProject/js/utils/FavoriteStore.js
 */
import AsyncStorage from '@react-native-community/async-storage';

export class FavoriteStore {
  static FAVORITE_HOT = 'FAVORITE_HOT';
  static FAVORITE_TRENDING = 'FAVORITE_TRENDING';

  /**
   * 保存收藏的项目
   * @param {String} type 集合类型
   * @param {String} key 存储的项目名
   * @param {Object} value 存储的项目对象
   * @param {Function} callback 回调
   */
  static async saveItem(type, key, value, callback) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    // 更新 key
    await this.updateKeys(type, key, true);
    if (callback) {
      callback();
    }
  }

  /**
   * 删除收藏的项目
   * @param {String} type 集合类型
   * @param {*} key 存储的项目名
   */
  static async removeItem(type, key) {
    await AsyncStorage.removeItem(key);
    await this.updateKeys(type, key, false);
  }

  /**
   * 更新收藏项目名集合
   * @param {*} type 集合类型（最热或者趋势）
   * @param {*} key 存储的项目名
   * @param {*} isAdd 是否是新增
   */
  static async updateKeys(type, key, isAdd) {
    const res = await AsyncStorage.getItem(type);
    let keys = res ? JSON.parse(res) : [];
    let index = keys.indexOf(key);
    // 如果是添加且 key 不在集合中
    if (isAdd && index === -1) {
      keys.push(key);
    }
    // 如果是删除且 key 存在于集合中
    if (!isAdd && index !== -1) {
      keys.splice(index, 1);
    }
    // 更新集合
    await AsyncStorage.setItem(type, JSON.stringify(keys));
  }

  /**
   * 获取收藏项目名集合
   * @param {*} type 集合类型
   */
  static async getKeys(type) {
    try {
      const res = await AsyncStorage.getItem(type);
      return JSON.parse(res);
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * 获取收藏项目集合
   * @param {*} type 集合类型
   */
  static async getItems(type) {
    try {
      const keys = await this.getKeys(type);
      if (keys) {
        const itemArrays = await AsyncStorage.multiGet(keys);
        const items = itemArrays.map((itemArray) => {
          const value = itemArray[1];
          return JSON.parse(value);
        });
        return items.filter((item) => item !== null);
      }
    } catch (error) {
      throw Error(error);
    }
  }

  /**
   * 检查集合中是否有某项目
   * @param {*} type
   * @param {*} item
   */
  static async checkItemInKeys(keys, item) {
    if (keys) {
      const key = item.html_url ? item.html_url : item.url; // 最热为 html_url，趋势为 url
      if (keys.indexOf(key) !== -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * 变更收藏的项目及项目名集合
   * @param {*} type 集合类型
   * @param {*} item 存储的项目
   * @param {*} isFavorite 是否收藏
   */
  static async toggleItems(type, item, isFavorite) {
    const key = item.html_url ? item.html_url : item.url;
    if (isFavorite) {
      await this.saveItem(type, key, item);
    } else {
      await this.removeItem(type, key);
    }
  }
}
