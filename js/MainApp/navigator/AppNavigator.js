/*
 * @Author: KokoTa
 * @Date: 2020-08-10 17:30:16
 * @LastEditTime: 2020-08-12 16:11:48
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/AppNavigator.js
 */
import HomeBottomNavigator from './HomeBottomNavigator';
const {createAppContainer} = require('react-navigation');
const {createStackNavigator} = require('react-navigation-stack');

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeBottomNavigator,
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
