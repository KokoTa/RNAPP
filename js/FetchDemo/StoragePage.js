/*
 * @Author: KokoTa
 * @Date: 2020-08-05 17:55:17
 * @LastEditTime: 2020-08-08 15:29:19
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/FetchDemo/StoragePage.js
 */
import React, {useState} from 'react';
import {Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DataStore from '../utils/DataStore';

const url = 'https://api.github.com/search/repositories?q=js';

export default function StoragePage() {
  const [text, setText] = useState('');

  const doSave = async () => {
    try {
      await AsyncStorage.setItem('name', 'Brain');
    } catch (err) {
      console.log(err);
    }
  };

  const doRemove = async () => {
    try {
      await AsyncStorage.removeItem('name');
    } catch (err) {
      console.log(err);
    }
  };

  const doRead = async () => {
    try {
      const res = await AsyncStorage.getItem('name');
      setText(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.header}>AsyncStorage测试</Text>
      <Text style={styles.text}>存储的数据：{text}</Text>
      <Button title="存储" onPress={() => doSave()} />
      <Button title="删除" onPress={() => doRemove()} />
      <Button title="读取" onPress={() => doRead()} />
      <Button
        title="获取缓存数据"
        onPress={async () => {
          try {
            const res = await DataStore.fetchData(url);
            console.log(res);
          } catch (error) {
            console.log(error, 1);
          }
        }}
      />
      <Button
        title="清除缓存数据"
        onPress={async () => {
          try {
            await DataStore.clearData(url);
            console.log('清除成功');
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
