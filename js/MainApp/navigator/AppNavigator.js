/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-20 12:03:36
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/AppNavigator.js
 */
import HomeBottomNavigator from './HomeBottomNavigator';
import DetailPage from '../page/DetailPage';
import WebviewPage from '../page/WebviewPage';
import AboutPage from '../page/AboutPage';
import CustomKeyPage from '../page/CustomKeyPage';
import SortKeyPage from '../page/SortKeyPage';
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
    CustomKeyPage: {
      screen: CustomKeyPage,
    },
    SortKeyPage: {
      screen: SortKeyPage,
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
