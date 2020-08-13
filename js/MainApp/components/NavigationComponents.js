import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

/*
 * @Author: KokoTa
 * @Date: 2020-08-13 14:22:01
 * @LastEditTime: 2020-08-13 15:46:35
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
        style={{padding: 8, paddingLeft: 21}}
        onPress={callback}>
        <Ionicons name="ios-arrow-back" size={26} style={{color: 'white'}} />
      </TouchableOpacity>
    );
  }
  static getShareButton(callback) {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{paddingHorizontal: 8}}>
          <FontAwesome
            name="star-o"
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
}
