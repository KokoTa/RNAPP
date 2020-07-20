/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:26:19
 * @LastEditTime: 2020-07-17 16:21:34
 * @Description:
 */
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import DetailPage from '../pages/DetailPage';

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
    screen: HomePage,
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
