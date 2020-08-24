import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

/*
 * @Author: KokoTa
 * @Date: 2020-08-13 14:22:01
 * @LastEditTime: 2020-08-24 11:20:44
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/NavigationComponents.js
 */
export default class NavigationComponents {
  /**
   * 左侧返回按钮
   * @param {*} callback
   */
  static getLeftBackButton(callback) {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 10}}
        onPress={callback}>
        <Ionicons name="ios-arrow-back" size={26} style={{color: 'white'}} />
      </TouchableOpacity>
    );
  }
  /**
   * 获取分享按钮
   * @param {*} callback
   */
  static getShareButton(callback) {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{paddingHorizontal: 5, paddingRight: 10}}>
          <AntDesign
            name="sharealt"
            size={24}
            style={{
              alignItems: 'center',
              color: 'white',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
  /**
   * 获取收藏按钮
   * @param {*} isFavorite 是否收藏
   * @param {*} toggle 状态切换函数
   * @param {*} color 图标颜色
   */
  static getStarButton(isFavorite, toggle, color) {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 5}}
        onPress={() => toggle(!isFavorite)}>
        <FontAwesome
          name={isFavorite ? 'star' : 'star-o'}
          size={26}
          style={{color: color ? color : 'white'}}
        />
      </TouchableOpacity>
    );
  }
  /**
   * 保存按钮
   */
  static getSaveButton(callback) {
    return (
      <TouchableOpacity
        onPress={() => {
          callback();
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            marginRight: 10,
          }}>
          保存
        </Text>
      </TouchableOpacity>
    );
  }
  /**
   * 搜索
   */
  static getSearchButton(callback) {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 5, paddingRight: 10}}
        onPress={() => callback()}>
        <Ionicons name="search" size={26} style={{color: 'white'}} />
      </TouchableOpacity>
    );
  }
}
