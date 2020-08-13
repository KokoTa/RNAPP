/*
 * @Author: KokoTa
 * @Date: 2020-08-13 15:45:56
 * @LastEditTime: 2020-08-13 16:56:18
 * @LastEditors: KokoTa
 * @Description: Android 物理返回健的监听
 * @FilePath: /AwesomeProject/js/MainApp/hook/useHandleBack.js
 */
import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export default function useHandleBack(callback) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      callback();
      return true; // 返回 true 则不会冒泡，且不会触发返回操作
    });
    return () => {
      BackHandler.removeEventListener('hardwareBackPress');
    };
  });
}
