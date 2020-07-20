/*
 * @Author: KokoTa
 * @Date: 2020-07-15 14:48:56
 * @LastEditTime: 2020-07-16 14:22:29
 * @Description:
 */
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default function NavigateDemo(props) {
  const {navigation} = props;
  const {state, setParams} = navigation;
  const {mode} = state.params;

  return (
    <View style={styles.wrap}>
      <View style={styles.item}>
        <Text>当前状态：{mode}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setParams({mode: text});
          }}
        />
        <Button title={'Go Back'} onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

NavigateDemo.navigationOptions = {
  title: '导航传参',
  headerBackTitle: '返回首页', // ios，有长度限制
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  item: {
    margin: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    margin: 10,
  },
});
