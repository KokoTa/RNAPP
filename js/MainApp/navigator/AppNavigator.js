/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-17 19:41:50
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/AppNavigator.js
 */
import HomeBottomNavigator from './HomeBottomNavigator';
import DetailPage from '../page/DetailPage';
import WebviewPage from '../page/WebviewPage';
import AboutPage from '../page/AboutPage';
const {createAppContainer} = require('react-navigation');
const {createStackNavigator} = require('react-navigation-stack');

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeBottomNavigator,
    },
    DetailPage: {
      screen: DetailPage,
    },
    WebviewPage: {
      screen: WebviewPage,
    },
    AboutPage: {
      screen: AboutPage,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: null,
    },
  },
);

const AppNavigator = createAppContainer(stackNavigator);

export default AppNavigator;
