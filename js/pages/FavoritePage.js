/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:20:02
 * @LastEditTime: 2020-07-17 10:22:56
 * @Description:
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function FavoritePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FavoritePage</Text>
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
