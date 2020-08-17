/*
 * @Author: KokoTa
 * @Date: 2020-08-17 13:01:40
 * @LastEditTime: 2020-08-17 19:49:53
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/MenuItem.js
 */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MenuItem(props) {
  const {
    text,
    Icons,
    icon,
    size = 16,
    height = 60,
    color = 'black',
    callBack,
    expandIcon,
  } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        callBack(text);
      }}
      style={{...styles.item, height}}>
      {/* 左侧 icon 和名字 */}
      <View style={styles.left}>
        {Icons && icon ? (
          <Icons name={icon} size={size} style={{color, marginRight: 10}} />
        ) : (
          <View style={{...styles.placeholder, width: size, height: size}} />
        )}
        <Text>{text}</Text>
      </View>
      {/* 右侧箭头 */}
      {expandIcon ? (
        expandIcon
      ) : (
        <Ionicons
          name="ios-arrow-forward"
          size={16}
          style={{
            color,
            marginRight: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    opacity: 1,
    marginRight: 10,
  },
});
