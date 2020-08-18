/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-18 09:55:50
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

const FavoriteNavigator = createMaterialTopTabNavigator(createTabs(tabList), {
  tabBarOptions: {
    upperCaseLabel: false,
  },
});

// 由于 navigation 4.x 不支持函数的赋值方式，所以用 class 来解决
export default class FavoriteNavigatorWrap extends Component {
  static router = FavoriteNavigator.router;
  render() {
    NavigationStore.setNavigation(this.props.navigation);
    return (
      <>
        <ConnectNavigationBar />
        <FavoriteNavigator navigation={this.props.navigation} />
      </>
    );
  }
}
