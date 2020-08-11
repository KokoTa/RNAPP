/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-11 11:59:44
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/PopularNavigator/index.js
 */
import React from 'react';
const {createMaterialTopTabNavigator} = require('react-navigation-tabs');
import PopularPage from '../../page/PopularPage';

const tabList = ['java', 'javascript', 'C++', 'go', 'php'];

function createTabs(tabList) {
  let tabs = {};
  tabList.forEach((tabName) => {
    tabs[tabName] = {
      screen: (props) => <PopularPage {...props} storeName={tabName} />,
    };
  });
  return tabs;
}

const PopularNavigator = createMaterialTopTabNavigator({
  ...createTabs(tabList),
});

export default PopularNavigator;
