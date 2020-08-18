/*
 * @Author: KokoTa
 * @Date: 2020-08-18 10:58:35
 * @LastEditTime: 2020-08-18 11:31:44
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/MenuItemGroup.js
 */
import React from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuItem from './MenuItem';
import {globalStyle} from '../common/globalStyle';
import {connect} from 'react-redux';

// 点击类型
const TITLE = 'title';
const CHILDREN = 'children';

function MenuItemGroup(props) {
  const {titleConfig, isShow, children, theme, callBack} = props;

  return (
    <View>
      <MenuItem
        {...titleConfig}
        expandIcon={
          isShow ? (
            <Ionicons
              name="ios-arrow-up"
              size={16}
              style={{
                color: theme.themeColor,
                marginRight: 10,
              }}
            />
          ) : (
            <Ionicons
              name="ios-arrow-down"
              size={16}
              style={{
                color: theme.themeColor,
                marginRight: 10,
              }}
            />
          )
        }
        color={theme.themeColor}
        callBack={() => callBack(TITLE, !isShow)}
      />
      {isShow ? (
        <>
          {children.map((item) => (
            <View key={item.text}>
              <View style={globalStyle.line} />
              <MenuItem
                text={`${item.text}: ${item.account}`}
                color={theme.themeColor}
                callBack={() => callBack(CHILDREN, item)}
              />
            </View>
          ))}
        </>
      ) : null}
    </View>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemGroup);
