/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-17 11:03:52
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/PopularNavigator.js
 */
import React from 'react';
import PopularPage from '../page/PopularPage';
import NavigationBar from '../components/NavigationBar';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import NavigationStore from '../../utils/NavigationStore';
const tabList = ['javascript', 'java', 'c++', 'go', 'rust'];

// 自定义导航栏
const CustomNavigationBar = (props) => {
  const {theme} = props;
  return (
    <NavigationBar
      title="最热"
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
  list.forEach((tabName) => {
    tabs[tabName] = {
      screen: (props) => <PopularPage {...props} storeName={tabName} />,
    };
  });
  return tabs;
};

const PopularNavigator = createAppContainer(
  createMaterialTopTabNavigator(createTabs(tabList), {
    tabBarOptions: {
      upperCaseLabel: false,
      scrollEnabled: true,
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
      <PopularNavigator />
    </>
  );
};
