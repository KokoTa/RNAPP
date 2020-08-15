/*
 * @Author: KokoTa
 * @Date: 2020-08-11 14:12:11
 * @LastEditTime: 2020-08-15 14:18:26
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/PopularItem.js
 */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FavoriteStore} from '../../utils/FavoriteStore';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationComponents from './NavigationComponents';

function PopularItem(props) {
  const {theme, item, storeName, onSelect, onChangePopularFavorite} = props;
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
              style={{height: 22, width: 22, marginLeft: 5}}
              source={{
                uri: item.owner.avatar_url,
              }}
            />
          </View>
          <View style={styles.row}>
            <Text>Star:</Text>
            <Text>{item.stargazers_count}</Text>
          </View>
          {NavigationComponents.getStarButton(
            item.isFavorite,
            (isFavorite) => {
              // PS: 这里注意要先更新 redux，再更新 storage，因为我们要存储状态改变后的 item，redux 更新改变了 item 的状态
              // 更新对应项的 redux 状态
              onChangePopularFavorite(storeName, item, isFavorite);
              // 更新对应项的 storage 状态
              FavoriteStore.toggleItems(
                FavoriteStore.FAVORITE_HOT,
                item,
                isFavorite,
              );
            },
            theme.themeColor,
          )}
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

const mapStateToProps = (state) => ({
  theme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePopularFavorite: (storeName, item, isFavorite) =>
    dispatch(actions.onChangePopularFavorite(storeName, item, isFavorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularItem);
