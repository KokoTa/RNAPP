/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-11 19:32:33
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/PopularNavigator/index.js
 */
import React from 'react';
import PopularPage from '../../page/PopularPage';
const {createMaterialTopTabNavigator} = require('react-navigation-tabs');

const tabList = ['javascript', 'java', 'c++', 'go', 'rust'];

function createTabs(list) {
  let tabs = {};
  list.forEach((tabName) => {
    tabs[tabName] = {
      screen: (props) => <PopularPage {...props} storeName={tabName} />,
    };
  });
  return tabs;
}

const PopularNavigator = createMaterialTopTabNavigator(createTabs(tabList), {
  tabBarOptions: {
    upperCaseLabel: false,
    scrollEnabled: true,
  },
});

export default PopularNavigator;
