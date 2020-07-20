/*
 * @Author: KokoTa
 * @Date: 2020-07-17 16:07:28
 * @LastEditTime: 2020-07-17 16:07:41
 * @Description:
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function DetailPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DetailPage</Text>
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
