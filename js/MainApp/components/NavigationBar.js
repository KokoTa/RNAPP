/*
 * @Author: KokoTa
 * @Date: 2020-08-12 10:01:57
 * @LastEditTime: 2020-08-17 20:05:46
 * @LastEditors: KokoTa
 * @Description: 自定义导航栏
 * @FilePath: /AwesomeProject/js/MainApp/components/NavigationBar.js
 */
import React from 'react';

import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  View,
  StatusBar,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const IOS_NAV_BAR_HEIGHT = 44;
export const ANDROID_NAV_BAR_HEIGHT = 50;

// 按钮容器
function getButtonElement(button) {
  return button ? <View style={styles.navBarButton}>{button}</View> : null;
}

export default function NavigationBar(props) {
  // 状态栏
  const statusBar = !props.statusBar.hidden ? (
    <View style={styles.statusBar}>
      <StatusBar {...props.statusBar} />
    </View>
  ) : null;

  // 标题
  const titleView = props.titleView ? (
    props.titleView
  ) : (
    <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
      {props.title}
    </Text>
  );

  // 导航栏
  const content = !props.hide ? (
    <View style={styles.navBar}>
      {getButtonElement(props.leftButton)}
      <View style={[styles.navBarTitleContainer, props.titleLayoutStyle]}>
        {titleView}
      </View>
      {getButtonElement(props.rightButton)}
    </View>
  ) : null;

  return (
    <View style={[styles.container, props.style]}>
      {statusBar}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: getStatusBarHeight(true), // 传入 true 表示 Android 不需要获取高度，具体看包文档
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? IOS_NAV_BAR_HEIGHT : ANDROID_NAV_BAR_HEIGHT,
  },
  navBarButton: {
    alignItems: 'center',
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  container: {},
});

// 状态栏属性
const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

// 导航栏属性
NavigationBar.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  titleView: PropTypes.element,
  titleLayoutStyle: ViewPropTypes.style,
  hide: PropTypes.bool,
  statusBar: PropTypes.shape(StatusBarShape),
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
};

// 默认属性
NavigationBar.defaultProps = {
  statusBar: {
    barStyle: 'light-content',
    hidden: false,
  },
};
