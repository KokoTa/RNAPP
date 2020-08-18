/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-18 09:55:33
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/PopularNavigator.js
 */
import React, {Component} from 'react';
import PopularPage from '../page/PopularPage';
import NavigationBar from '../components/NavigationBar';
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

const PopularNavigator = createMaterialTopTabNavigator(createTabs(tabList), {
  tabBarOptions: {
    upperCaseLabel: false,
    scrollEnabled: true,
  },
});

// 由于 navigation 4.x 不支持函数的赋值方式，所以用 class 来解决
export default class PopularNavigatorWrap extends Component {
  static router = PopularNavigator.router;
  render() {
    NavigationStore.setNavigation(this.props.navigation);
    return (
      <>
        <ConnectNavigationBar />
        <PopularNavigator navigation={this.props.navigation} />
      </>
    );
  }
}
