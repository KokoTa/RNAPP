/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:20:17
 * @LastEditTime: 2020-07-17 10:22:47
 * @Description:
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function MyPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MyPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});
