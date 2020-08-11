/*
 * @Author: KokoTa
 * @Date: 2020-08-10 19:14:15
 * @LastEditTime: 2020-08-11 12:05:00
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/PopularPage.js
 */

import React, {useEffect, useCallback} from 'react';
import {Text, View, SafeAreaView, FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';

// 列表项
function renderItem(data) {
  return (
    <View style={{marginBottom: 50}}>
      <Text style={{backgroundColor: 'pink'}}>
        {JSON.stringify(data.item, null, 2)}
      </Text>
    </View>
  );
}

const PopularPage = (props) => {
  const {onLoadPopularData, storeName, popular} = props;

  let store = popular[storeName];
  if (!store) {
    store = {
      items: [],
      isLoading: false,
    };
  }

  const loadData = useCallback(
    (key) => {
      const url = `https://api.github.com/search/repositories?q=${key}&sort=stars`;
      onLoadPopularData(key, url);
    },
    [onLoadPopularData],
  );

  useEffect(() => {
    loadData(storeName);
  }, [loadData, storeName]);

  return (
    <SafeAreaView>
      <FlatList
        data={store.items}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id + ''}
        refreshControl={
          <RefreshControl
            title="Loading"
            titleColor="red"
            colors={['blue']}
            tintColor="yellow"
            refreshing={store.isLoading}
            onRefresh={() => loadData(storeName)}
          />
        }
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  popular: state.popular,
});
const mapDispatchToProps = (dispatch) => ({
  onLoadPopularData: (storeName, url) =>
    dispatch(actions.onLoadPopularData(storeName, url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage);
