/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-24 11:13:42
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
import ThemePage from '../page/ThemePage';
import SearchPage from '../page/SearchPage';
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
    ThemePage: {
      screen: ThemePage,
    },
    SearchPage: {
      screen: SearchPage,
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
