/*
 * @Author: KokoTa
 * @Date: 2020-08-11 14:12:11
 * @LastEditTime: 2020-08-15 17:49:24
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/TrendingItem.js
 */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {FavoriteStore} from '../../utils/FavoriteStore';
import {connect} from 'react-redux';
import actions from '../action';
import NavigationComponents from './NavigationComponents';
import Type from '../action/type';
import EventBus from '../../utils/EventBus';

function TrendingItem(props) {
  const {
    theme,
    item,
    onSelect,
    onChangeTrendingFavorite,
    isFavoritePage,
  } = props;
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
            async (isFavorite) => {
              if (!isFavoritePage) {
                // 更新对应项的 redux 状态
                onChangeTrendingFavorite(item, isFavorite);
                // 更新对应项的 storage 状态
                await FavoriteStore.toggleItems(
                  FavoriteStore.FAVORITE_TRENDING,
                  item,
                  isFavorite,
                );
              } else {
                // 更新对应项的 storage 状态
                await FavoriteStore.toggleItems(
                  FavoriteStore.FAVORITE_TRENDING,
                  item,
                  isFavorite,
                );
                // 发布事件，触发多个地方的数据更新
                EventBus.getInstance().fireEvent(Type.FAVORITE_TRENDING_CHANGE);
              }
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
