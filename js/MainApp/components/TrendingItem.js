/*
 * @Author: KokoTa
 * @Date: 2020-08-11 14:12:11
 * @LastEditTime: 2020-08-15 14:09:54
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/TrendingItem.js
 */
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FavoriteStore} from '../../utils/FavoriteStore';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationComponents from './NavigationComponents';

function TrendingItem(props) {
  const {theme, item, onSelect, onChangeTrendingFavorite} = props;
  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.container}>
        <Text style={styles.title}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text>Author:</Text>
            {item.contributors.map((uri) => (
              <Image
                style={{height: 22, width: 22, marginLeft: 5}}
                source={{uri}}
                key={uri}
              />
            ))}
          </View>
          <View style={styles.row}>
            <Text>Star:</Text>
            <Text>{item.starCount}</Text>
          </View>
          {NavigationComponents.getStarButton(
            item.isFavorite,
            (isFavorite) => {
              // 更新对应项的 redux 状态
              onChangeTrendingFavorite(item, isFavorite);
              // 更新对应项的 storage 状态
              FavoriteStore.toggleItems(
                FavoriteStore.FAVORITE_TRENDING,
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
  onChangeTrendingFavorite: (item, isFavorite) =>
    dispatch(actions.onChangeTrendingFavorite(item, isFavorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingItem);
