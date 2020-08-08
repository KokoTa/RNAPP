/*
 * @Author: KokoTa
 * @Date: 2020-08-05 17:55:17
 * @LastEditTime: 2020-08-08 14:35:57
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/FetchDemo/FetchPage.js
 */
import React, {useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';

export default function FetchPage() {
  const [text, setText] = useState('');
  const [textData, setTextData] = useState('');

  const getData = async () => {
    const url = `https://api.github.com/search/repositories?q=${text}`;
    const result = await fetch(url).catch((err) => err);
    if (result.ok) {
      const data = await result.text();
      setTextData(data);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.header}>Fetch使用</Text>
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={(t) => setText(t)} />
        <Button
          title="发送"
          onPress={() => {
            getData();
          }}
        />
      </View>
      <Text>{textData}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
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
