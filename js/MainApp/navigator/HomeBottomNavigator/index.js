/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:19:04
 * @LastEditTime: 2020-08-11 13:59:20
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/HomeBottomNavigator/index.js
 */
import React from 'react';
const {createBottomTabNavigator} = require('react-navigation-tabs');
import PopularNavigator from '../PopularNavigator';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeBottomNavigator = createBottomTabNavigator({
  PopularPage: {
    screen: PopularNavigator,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <AntDesign name="home" size={26} color={tintColor} />;
      },
    },
  },
});

export default HomeBottomNavigator;
