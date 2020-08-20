/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:19:04
 * @LastEditTime: 2020-08-20 16:31:06
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/HomeBottomNavigator.js
 */
import React, {useEffect, useState} from 'react';
const {createBottomTabNavigator} = require('react-navigation-tabs');
import PopularNavigator from './PopularNavigator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendingPage from '../page/TrendingPage';
import FavoriteNavigator from './FavoriteNavigator';
import MyPage from '../page/MyPage';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import NavigationStore from '../../utils/NavigationStore';
import actions from '../action';
import {View} from 'react-native';
import Type from '../action/type';
import EventBus from '../../utils/EventBus';

const HomeBottomNavigatorWrap = (props) => {
  const {theme, navigation, onLoadThemeColor} = props;
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const fetchColor = async () => {
      await onLoadThemeColor();
      setThemeLoaded(true);
    };
    // 存储第一个 createAppContainer 的 navigation
    NavigationStore.setNavigation(navigation);
    // 加载保存的主题色，没有会获取默认主题色
    fetchColor();
  }, [navigation, onLoadThemeColor]);

  const HomeBottomNavigator = createAppContainer(
    createBottomTabNavigator(
      {
        PopularPage: {
          screen: PopularNavigator,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return <AntDesign name="home" size={26} color={tintColor} />;
            },
          },
        },
        TrendingPage: {
          screen: TrendingPage,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <Ionicons name="trending-up" size={26} color={tintColor} />
              );
            },
          },
        },
        FavoritePage: {
          screen: FavoriteNavigator,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <MaterialIcons name="favorite" size={26} color={tintColor} />
              );
            },
          },
        },
        MyPage: {
          screen: MyPage,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => {
              return (
                <MaterialIcons name="person" size={26} color={tintColor} />
              );
            },
          },
        },
      },
      {
        tabBarOptions: {
          activeTintColor: theme.themeColor,
        },
      },
    ),
  );

  return themeLoaded ? (
    <HomeBottomNavigator
      onNavigationStateChange={(prevState, currentState) => {
        const currentIndex = currentState.index;
        // 如果跳转到收藏页，就触发该页的数据更新
        console.log(currentState);
        if (currentIndex === 2) {
          EventBus.getInstance().fireEvent(Type.FAVORITE_DATA_REFRESH);
        }
      }}
    />
  ) : (
    <View />
  );
};

export default connect(
  (state) => ({
    theme: state.theme,
  }),
  (dispatch) => ({
    onLoadThemeColor: () => dispatch(actions.onLoadThemeColor()),
  }),
)(HomeBottomNavigatorWrap);
