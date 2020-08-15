/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-15 14:04:43
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/FavoriteNavigator.js
 */
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import NavigationStore from '../../utils/NavigationStore';
import FavoritePage from '../page/FavoritePage';
import {FavoriteStore} from '../../utils/FavoriteStore';
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

// 构造顶部 tab 结构数据
const createTabs = (list) => {
  let tabs = {};
  list.forEach((tab) => {
    tabs[tab.name] = {
      screen: (props) => <FavoritePage {...props} storeName={tab.value} />,
    };
  });
  return tabs;
};

const FavoriteNavigator = createAppContainer(
  createMaterialTopTabNavigator(createTabs(tabList), {
    tabBarOptions: {
      upperCaseLabel: false,
    },
  }),
);

export default (props) => {
  const {navigation} = props;
  // 储存第一个 createAppContainer 的 navigation
  NavigationStore.setNavigation(navigation);
  return (
    <>
      <ConnectNavigationBar />
      <FavoriteNavigator />
    </>
  );
};
