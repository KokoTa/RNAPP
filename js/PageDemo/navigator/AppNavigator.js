/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:26:19
 * @LastEditTime: 2020-07-17 16:21:34
 * @Description:
 */
import WelcomePage from '../WelcomePage';
import DetailPage from '../DetailPage';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';

const initNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      headerShown: null,
    },
  },
});

const mainNavigator = createStackNavigator({
  HomePage: {
    screen: HomeBottomTabNavigator,
    navigationOptions: {
      headerShown: null,
    },
  },
  DetailPage: {
    screen: DetailPage,
  },
});

const switchNavigator = createSwitchNavigator({
  initNavigator,
  mainNavigator,
});

const appNavigator = createAppContainer(switchNavigator);

export default appNavigator;
