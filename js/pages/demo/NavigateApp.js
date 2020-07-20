/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

const NavigateApp = (props) => {
  const {navigation} = props;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.btnWrap}>
          <Button
            title={'底部导航'}
            onPress={() => {
              navigation.navigate('AppBottomTabNavigator');
            }}
          />
        </View>
        <View style={styles.btnWrap}>
          <Button
            title={'顶部导航'}
            onPress={() => {
              navigation.navigate('AppTopTabNavigator');
            }}
          />
        </View>
        <View style={styles.btnWrap}>
          <Button
            title={'侧边导航'}
            onPress={() => {
              navigation.navigate('AppDrawerNavigator');
            }}
          />
        </View>
        <View style={styles.btnWrap}>
          <Button
            title={'切换导航'}
            onPress={() => {
              navigation.navigate('AppStackNavigatorLogin');
            }}
          />
        </View>
        <View style={styles.btnWrap}>
          <Button
            title={'导航传参'}
            onPress={() => {
              navigation.navigate('NavigateDemo', {
                mode: 'edit',
              });
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnWrap: {
    margin: 10,
  },
});

export default NavigateApp;
