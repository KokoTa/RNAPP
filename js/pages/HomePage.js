/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:24:48
 * @LastEditTime: 2020-07-17 16:19:42
 * @Description:
 */
import React from 'react';
import HomeBottomTabNavigator from '../navigator/HomeBottomTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';

export default function HomePage(props) {
  const {navigation} = props;
  NavigationUtil.navigation = navigation;
  return <HomeBottomTabNavigator />;
}
