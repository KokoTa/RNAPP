/*
 * @Author: KokoTa
 * @Date: 2020-08-11 14:12:11
 * @LastEditTime: 2020-08-11 15:14:02
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/PopularPage/PopularItem/index.js
 */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function FavoriteIcon() {
  return (
    <TouchableOpacity style={{padding: 6}} onPress={() => {}}>
      <FontAwesome name="star-o" size={26} />
    </TouchableOpacity>
  );
}

export default function PopularItem(props) {
  const {item, onSelect} = props;
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.full_name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Author:</Text>
            <Image
              style={{height: 22, width: 22}}
              source={{uri: item.owner.avatar_url}}
            />
          </View>
          <View style={styles.row}>
            <Text>Star:</Text>
            <Text>{item.stargazers_count}</Text>
          </View>
          {FavoriteIcon()}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    // IOS 阴影属性
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    // Android 阴影属性
    elevation: 2,
    marginBottom: 5,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
});
