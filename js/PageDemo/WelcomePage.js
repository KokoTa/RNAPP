/*
 * @Author: KokoTa
 * @Date: 2020-07-17 09:59:15
 * @LastEditTime: 2020-08-05 17:21:18
 * @Description:
 */
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function WelcomePage(props) {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        const {navigation} = props;
        navigation.navigate('HomePage');
      }, 3000),
    );
  }, [props]);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>WelcomePage</Text>
      <Text style={styles.text}>欢迎页，3s 后跳转到主页</Text>
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
