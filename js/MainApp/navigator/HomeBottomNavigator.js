/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:19:04
 * @LastEditTime: 2020-08-20 11:06:55
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/HomeBottomNavigator.js
 */
import React from 'react';
const {createBottomTabNavigator} = require('react-navigation-tabs');
import PopularNavigator from './PopularNavigator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingPage from '../page/TrendingPage';
import FavoriteNavigator from './FavoriteNavigator';
import MyPage from '../page/MyPage';

const HomeBottomNavigator = createBottomTabNavigator({
  PopularPage: {
    screen: PopularNavigator,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <AntDesign name="home" size={26} color={tintColor} />;
      },
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <Ionicons name="trending-up" size={26} color={tintColor} />;
      },
    },
  },
  FavoritePage: {
    screen: FavoriteNavigator,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <MaterialIcons name="favorite" size={26} color={tintColor} />;
      },
    },
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <MaterialIcons name="person" size={26} color={tintColor} />;
      },
    },
  },
});

export default HomeBottomNavigator;
