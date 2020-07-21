/*
 * @Author: KokoTa
 * @Date: 2020-07-16 14:11:33
 * @LastEditTime: 2020-07-16 14:32:28
 * @Description:
 */
import React from 'react';
import {View, Button} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';

export default function TestPage(props) {
  const {navigation} = props;

  return (
    <View>
      <Button
        title={'打开导航1'}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
      <Button
        title={'打开导航2'}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
    </View>
  );
}
