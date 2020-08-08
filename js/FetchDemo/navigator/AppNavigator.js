/*
 * @Author: KokoTa
 * @Date: 2020-08-05 17:44:14
 * @LastEditTime: 2020-08-08 14:35:46
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/FetchDemo/navigator/AppNavigator.js
 */
import {createAppContainer} from 'react-navigation';
import FetchPage from '../FetchPage';
import StoragePage from '../StoragePage';
import {createBottomTabNavigator} from 'react-navigation-tabs';

const StackNavigator = createBottomTabNavigator({
  FetchPage: {
    screen: FetchPage,
  },
  StoragePage: {
    screen: StoragePage,
  },
});

const TestContainer = createAppContainer(StackNavigator);

export default TestContainer;
