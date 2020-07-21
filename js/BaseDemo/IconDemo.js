/*
 * @Author: KokoTa
 * @Date: 2020-07-15 12:24:47
 * @LastEditTime: 2020-07-15 14:48:26
 * @Description:
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function IconDemo() {
  return (
    <View>
      <Text>矢量图标测试</Text>
      <Ionicons name={'ios-analytics'} size={50} style={styles.style1} />
      <Ionicons name={'add'} size={100} style={styles.sytle2} />
    </View>
  );
}

const styles = StyleSheet.create({
  style1: {
    color: 'red',
  },
  sytle2: {
    color: 'blue',
  },
});
