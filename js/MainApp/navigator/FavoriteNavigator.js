/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-20 15:40:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/FavoriteNavigator.js
 */
import React, {Component} from 'react';
import NavigationBar from '../components/NavigationBar';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import NavigationStore from '../../utils/NavigationStore';
import FavoritePage from '../page/FavoritePage';
import {FavoriteStore} from '../../utils/FavoriteStore';
import {createAppContainer} from 'react-navigation';
const tabList = [
  {
    name: '最热',
    value: FavoriteStore.FAVORITE_HOT,
  },
  {
    name: '趋势',
    value: FavoriteStore.FAVORITE_TRENDING,
  },
];

// 自定义导航栏
const CustomNavigationBar = (props) => {
  const {theme} = props;
  return (
    <NavigationBar
      title="收藏"
      statusBar={{
        backgroundColor: theme.themeColor,
      }}
      style={{
        backgroundColor: theme.themeColor,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme,
});
const ConnectNavigationBar = connect(mapStateToProps)(CustomNavigationBar);

const FavoriteNavigatorWrap = (props) => {
  const {theme} = props;

  // 构造顶部 tab 结构数据
  const createTabs = (list) => {
    let tabs = {};
    list.forEach((tab) => {
      tabs[tab.name] = {
        screen: (params) => <FavoritePage {...params} storeName={tab.value} />,
      };
    });
    return tabs;
  };

  const FavoriteNavigator = createAppContainer(
    createMaterialTopTabNavigator(createTabs(tabList), {
      tabBarOptions: {
        upperCaseLabel: false,
        style: {
          backgroundColor: theme.themeColor,
        },
      },
    }),
  );

  return (
    <>
      <ConnectNavigationBar />
      <FavoriteNavigator />
    </>
  );
};

export default connect((state) => ({
  theme: state.theme,
}))(FavoriteNavigatorWrap);
