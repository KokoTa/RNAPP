/*
 * @Author: KokoTa
 * @Date: 2020-07-17 15:23:32
 * @LastEditTime: 2020-07-17 16:25:31
 * @Description:
 */
import React from 'react';
import {Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from './NavigationUtil';

const tabs = [
  'Java',
  'Android',
  'IOS',
  'React',
  'Javascript',
  'Vue',
  'Angular',
  'C++',
  'Rust',
  'Go',
];

const createTabs = (tbs) => {
  let pages = {};
  tbs.forEach((tabName) => {
    pages[tabName] = {
      screen: () => (
        <Button
          title={'Go Detail'}
          onPress={() => NavigationUtil.goPage('DetailPage')}
        />
      ),
      navigationOptions: {
        tabBarLabel: tabName,
      },
    };
  });
  return pages;
};

const TopTabNavigator = createAppContainer(
  createMaterialTopTabNavigator(createTabs(tabs), {
    tabBarOptions: {
      upperCaseLabel: false,
      scrollEnabled: true,
      style: {
        backgroundColor: '#a67',
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
      },
      labelStyle: {
        fontSize: 14,
      },
    },
  }),
);

export default TopTabNavigator;
