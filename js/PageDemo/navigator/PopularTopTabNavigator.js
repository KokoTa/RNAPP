/*
 * @Author: KokoTa
 * @Date: 2020-07-17 15:23:32
 * @LastEditTime: 2020-08-05 17:29:40
 * @Description:
 */
import React from 'react';
import {Button} from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

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
      screen: (props) => {
        const {navigation} = props;
        return (
          <Button
            title={'Go Detail'}
            onPress={() => navigation.navigate('DetailPage')}
          />
        );
      },
      navigationOptions: {
        tabBarLabel: tabName,
      },
    };
  });
  return pages;
};

// 兼容 IOS 刘海屏
const SafeTabBarComponent = (props) => (
  <SafeAreaView>
    <MaterialTopTabBar {...props} />
  </SafeAreaView>
);

const PopularTopTabNavigator = createMaterialTopTabNavigator(createTabs(tabs), {
  tabBarComponent: SafeTabBarComponent,
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
});

export default PopularTopTabNavigator;
