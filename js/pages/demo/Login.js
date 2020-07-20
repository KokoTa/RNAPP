/*
 * @Author: KokoTa
 * @Date: 2020-07-16 12:23:30
 * @LastEditTime: 2020-07-16 12:30:42
 * @Description:
 */
import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Login(props) {
  const {navigation} = props;

  return (
    <View>
      <Text style={{textAlign: 'center'}}>我是登录页</Text>
      <Button
        title={'点击登录'}
        onPress={() => {
          navigation.navigate('AppStackNavigatorContainer');
        }}
      />
    </View>
  );
}
