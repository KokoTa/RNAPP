/*
 * @Author: KokoTa
 * @Date: 2020-08-17 11:25:42
 * @LastEditTime: 2020-08-17 14:17:39
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/MyPage.js
 */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {menuConfig} from '../config/menuConfig';
import {globalStyle} from '../common/globalStyle';
import MenuItem from '../components/MenuItem';

function MyPage(props) {
  const {theme} = props;

  const handleMenuClick = (menuItem) => {
    console.log(menuItem);
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
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.Tutorial}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        {/* 趋势管理 */}
        <Text style={styles.groupTitle}>趋势管理</Text>
        <MenuItem
          {...menuConfig.Custom_Language}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.Sort_Language}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        {/* 最热管理 */}
        <Text style={styles.groupTitle}>最热管理</Text>
        <MenuItem
          {...menuConfig.Custom_Key}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.Sort_Key}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.Remove_Key}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        {/* 设置 */}
        <Text style={styles.groupTitle}>设置</Text>
        <MenuItem
          {...menuConfig.Custom_Theme}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        <View style={styles.line} />
        <MenuItem
          {...menuConfig.About_Author}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
        />
        {/* 反馈 */}
        <Text style={styles.groupTitle}>设置</Text>
        <MenuItem
          {...menuConfig.Feedback}
          color={theme.themeColor}
          callBack={() => handleMenuClick(menuConfig.About)}
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
