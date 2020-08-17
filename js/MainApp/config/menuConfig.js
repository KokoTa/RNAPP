/*
 * @Author: KokoTa
 * @Date: 2020-08-17 11:44:12
 * @LastEditTime: 2020-08-17 14:09:53
 * @LastEditors: KokoTa
 * @Description: 我的页面图标配置
 * @FilePath: /AwesomeProject/js/MainApp/config/MenuConfig.js
 */
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const menuConfig = {
  Custom_Language: {
    text: '自定义语言',
    Icons: Ionicons,
    icon: 'md-checkbox-outline',
  },
  Sort_Language: {
    text: '语言排序',
    Icons: MaterialCommunityIcons,
    icon: 'sort',
  },
  Custom_Theme: {
    text: '自定义主题',
    Icons: Ionicons,
    icon: 'ios-color-palette',
  },
  Custom_Key: {
    text: '自定义标签',
    Icons: Ionicons,
    icon: 'md-checkbox-outline',
  },
  Sort_Key: {text: '标签排序', Icons: MaterialCommunityIcons, icon: 'sort'},
  Remove_Key: {text: '标签移除', Icons: Ionicons, icon: 'md-remove'},
  About_Author: {text: '关于作者', Icons: Octicons, icon: 'smiley'},
  About: {text: '关于', Icons: Ionicons, icon: 'logo-github'},
  Tutorial: {text: '教程', Icons: Ionicons, icon: 'ios-bookmarks'},
  Feedback: {text: '反馈', Icons: MaterialIcons, icon: 'feedback'},
  Share: {text: '分享', Icons: Ionicons, icon: 'md-share'},
  CodePush: {text: 'CodePush', Icons: Ionicons, icon: 'ios-planet'},
};
