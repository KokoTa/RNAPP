/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:54:35
 * @LastEditTime: 2020-07-17 15:02:40
 * @Description:
 */
import React, {useState, useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import PopularPage from '../pages/PopularPage';
import TrendingPage from '../pages/TrendingPage';
import FavoritePage from '../pages/FavoritePage';
import MyPage from '../pages/MyPage';

const tabPages = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    },
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '最爱',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => (
        <Entypo name={'user'} size={26} style={{color: tintColor}} />
      ),
    },
  },
};

const TabBarComponent = (props) => {
  const [newTheme, setNewTheme] = useState({});
  const {routes, index} = props.navigation.state;
  const {params} = routes[index];

  useEffect(() => {
    setNewTheme({
      activeTintColor: props.activeTintColor,
    });
  }, [props.activeTintColor]);

  useEffect(() => {
    if (params) {
      const {theme} = params;
      if (theme) {
        setNewTheme(theme);
      }
    }
  }, [params]);

  return (
    <BottomTabBar
      {...props}
      activeTintColor={newTheme.activeTintColor || props.activeTintColor}
    />
  );
};

const BottomTabNavigator = createAppContainer(
  createBottomTabNavigator(tabPages, {
    tabBarComponent: (props) => {
      return <TabBarComponent {...props} />;
    },
  }),
);

export default BottomTabNavigator;
