/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-17 15:33:05
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/AppNavigator.js
 */
import HomeBottomNavigator from './HomeBottomNavigator';
import DetailPage from '../page/DetailPage';
import WebviewPage from '../page/WebviewPage';
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
  },
  {
    defaultNavigationOptions: {
      headerShown: null,
    },
  },
);

const AppNavigator = createAppContainer(stackNavigator);

export default AppNavigator;
