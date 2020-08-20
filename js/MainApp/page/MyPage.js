/*
 * @Author: KokoTa
 * @Date: 2020-08-17 11:25:42
 * @LastEditTime: 2020-08-20 12:04:33
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/MyPage.js
 */
import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {menuConfig} from '../config/menuConfig';
import {globalStyle} from '../common/globalStyle';
import MenuItem from '../components/MenuItem';
import NavigationStore from '../../utils/NavigationStore';

function MyPage(props) {
  const {theme} = props;

  const handleMenuClick = async (menuName) => {
    let RouteName = '';
    let params = {
      title: '',
      url: '',
    };

    switch (menuName) {
      case menuConfig.About.text:
        RouteName = 'AboutPage';
        break;
      case menuConfig.Tutorial.text:
        RouteName = 'WebviewPage';
        params = {
          title: '教程',
          url: 'http://www.baidu.com',
        };
        break;
      case menuConfig.Custom_Language.text:
        RouteName = 'CustomKeyPage';
        break;
      case menuConfig.Sort_Language.text:
        RouteName = 'SortKeyPage';
        break;
      case menuConfig.Feedback.text:
        const url = 'mailto://584847514@qq.com';
        try {
          const support = await Linking.canOpenURL(url);
          if (!support) {
            throw Error("can't handle url");
          }
          Linking.openURL(url);
        } catch (error) {
          console.log(error);
        }
        break;
    }

    if (RouteName) {
      console.log(RouteName);
      NavigationStore.navigation.navigate(RouteName, params);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationBar style={{backgroundColor: theme.themeColor}} title="我的" />
      <ScrollView>
        <MenuItem
          {...menuConfig.About}
          height={90}
          size={40}
          color={theme.themeColor}
          callBack={(menuName) => handleMenuClick(menuName)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.Tutorial}
          color={theme.themeColor}
          callBack={(menuName) => handleMenuClick(menuName)}
        />
        {/* 趋势管理 */}
        <Text style={styles.groupTitle}>趋势管理</Text>
        <MenuItem
          {...menuConfig.Custom_Language}
          color={theme.themeColor}
          callBack={(menuName) => handleMenuClick(menuName)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.Sort_Language}
          color={theme.themeColor}
          callBack={(menuName) => handleMenuClick(menuName)}
        />
        {/* 设置 */}
        <Text style={styles.groupTitle}>设置</Text>
        <MenuItem
          {...menuConfig.Custom_Theme}
          color={theme.themeColor}
          callBack={(menuName) => handleMenuClick(menuName)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.About_Author}
          color={theme.themeColor}
          callBack={(menuName) => handleMenuClick(menuName)}
        />
        {/* 反馈 */}
        <Text style={styles.groupTitle}>设置</Text>
        <MenuItem
          {...menuConfig.Feedback}
          color={theme.themeColor}
          callBack={(menuName) => handleMenuClick(menuName)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: globalStyle.line,
  groupTitle: globalStyle.groupTitle,
});

const mapStateToProps = (state) => ({
  theme: state.theme,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
