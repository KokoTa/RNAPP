/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:17:36
 * @LastEditTime: 2020-07-17 16:20:15
 * @Description:
 */
import React from 'react';
import PopularTopTabNavigator from '../navigator/PopularTopTabNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function PopularPage() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <PopularTopTabNavigator />
    </SafeAreaView>
  );
}
