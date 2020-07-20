/*
 * @Author: KokoTa
 * @Date: 2020-07-17 09:53:33
 * @LastEditTime: 2020-07-17 09:58:22
 * @Description: 导航配置
 */
import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import NavigateApp from './NavigateApp';
import FlatListDemo from './FlatListDemo';
import {ScrollView} from 'react-native-gesture-handler';
import SectionListDemo from './SectionListDemo';
import IconDemo from './IconDemo';
import NavigateDemo from './NavigateDemo';
import Login from './Login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawNavigateDemo from './DrawNavigateDemo';
import DrawNavigateDemo2 from './DrawNavigateDemo2';

/**
 * 底部 Tabbar 导航
 */
const AppBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: NavigateApp,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons name={'ios-home'} size={26} style={{color: tintColor}} />
        ),
      },
    },
    IconDemo: {
      screen: IconDemo,
      navigationOptions: {
        tabBarLabel: ({tintColor, focused}) => (
          <Text
            style={{color: focused ? 'orange' : 'gray', textAlign: 'center'}}>
            Icon测试
          </Text>
        ),
        // tintColor不是默认颜色就是下面 config 设置的颜色
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons name={'ios-home'} size={26} style={{color: tintColor}} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'red',
    },
  },
);

/**
 * 顶部 Tabbar 导航
 */
const AppTopTabNavigator = createMaterialTopTabNavigator(
  {
    FlatListDemo: {
      screen: FlatListDemo,
      navigationOptions: {
        tabBarLabel: 'FlatList测试',
      },
    },
    SectionListDemo: {
      screen: SectionListDemo,
      navigationOptions: {
        tabBarLabel: 'SectionList测试',
      },
    },
  },
  {
    tabBarOptions: {
      upperCaseLabel: false,
      style: {
        backgroundColor: 'white',
      },
      // 标签样式
      tabStyle: {
        minWidth: 50,
      },
      // 下划线样式
      indicatorStyle: {
        height: 2,
        backgroundColor: 'orange',
      },
      // 文字样式
      labelStyle: {
        fontSize: 16,
        color: 'black',
      },
    },
  },
);

/**
 * 侧边抽屉导航
 */
const AppDrawerNavigator = createDrawerNavigator(
  {
    Page1: {
      screen: DrawNavigateDemo,
      navigationOptions: {
        drawerLabel: '测试页1',
        drawerIcon: ({tintColor, focused}) => (
          <Ionicons name={'ios-home'} size={24} style={{color: tintColor}} />
        ),
      },
    },
    Page2: {
      screen: DrawNavigateDemo2,
      navigationOptions: {
        drawerLabel: '测试页2',
        drawerIcon: ({tintColor, focused}) => (
          <Ionicons name={'ios-home'} size={24} style={{color: tintColor}} />
        ),
      },
    },
  },
  {
    // 自定义侧边栏
    contentComponent: (props) => (
      <ScrollView style={{backgroundColor: '#098', flex: 1}}>
        {/* top: 'always' 强制填充顶部(IOS) */}
        <SafeAreaView forceInset={{top: 'always'}}>
          <DrawerNavigatorItems {...props} />
        </SafeAreaView>
      </ScrollView>
    ),
    contentOptions: {
      activeTintColor: 'white',
    },
  },
);

/**
 * 堆栈导航
 */
const AppStackNavigatorLogin = createStackNavigator({
  Login: {
    screen: Login,
  },
});
const AppStackNavigatorContainer = createStackNavigator(
  {
    AppBottomTabNavigator: {
      screen: AppBottomTabNavigator,
    },
    AppTopTabNavigator: {
      screen: AppTopTabNavigator,
    },
    AppDrawerNavigator: {
      screen: AppDrawerNavigator,
    },
    NavigateDemo: {
      screen: NavigateDemo,
      navigationOptions: ({navigation}) => {
        const {state, setParams} = navigation;
        const {params} = state;
        const {mode} = params;
        return {
          headerRight: () => (
            <View style={styles.wrap}>
              <Button
                title={mode === 'edit' ? '编辑' : '保存'}
                onPress={() => {
                  setParams({mode: mode === 'edit' ? 'save' : 'edit'});
                }}
              />
            </View>
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      // header: null, // 全局隐藏头部导航栏
    },
  },
);

const styles = StyleSheet.create({
  wrap: {
    marginRight: 10,
  },
});

/**
 * 切换导航器
 */
const AppSwitchNavigator = createSwitchNavigator({
  AppStackNavigatorLogin,
  AppStackNavigatorContainer,
});

const TestNavigator = createAppContainer(AppSwitchNavigator);

export default TestNavigator;
