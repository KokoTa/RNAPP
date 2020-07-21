/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:19:55
 * @LastEditTime: 2020-07-17 15:14:13
 * @Description:
 */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const randomColor = () =>
  '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);

export default function TrendingPage(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TrendingPage</Text>
      <Button
        title={'底部栏随机颜色'}
        onPress={() => {
          props.navigation.setParams({
            theme: {
              activeTintColor: randomColor(),
            },
          });
        }}
      />
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
