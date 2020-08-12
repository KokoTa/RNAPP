/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-12 17:55:13
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/PopularNavigator.js
 */
import React, {Component, PureComponent} from 'react';
import PopularPage from '../page/PopularPage';
import NavigationBar from '../components/NavigationBar';
import {createAppContainer} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {connect} from 'react-redux';
const tabList = ['javascript', 'java', 'c++', 'go', 'rust'];

// 自定义导航栏
const CustomNavigationBar = (props) => {
  const {theme} = props;

  // 自定义导航栏左侧按钮
  const createLeftButton = (callback) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{paddingHorizontal: 12}}
          onPress={() => {
            callback;
          }}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            style={{
              alignItems: 'center',
              color: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // 自定义导航栏右侧按钮
  const createRightButton = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{paddingHorizontal: 8}}>
            <Ionicons
              name="ios-search"
              size={24}
              style={{
                alignItems: 'center',
                color: 'white',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <NavigationBar
      title="最热"
      statusBar={{
        backgroundColor: theme.themeColor,
      }}
      style={{
        backgroundColor: theme.themeColor,
      }}
      leftButton={createLeftButton()}
      rightButton={createRightButton()}
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

export default () => (
  <>
    <ConnectNavigationBar />
    <PopularNavigator />
  </>
);
