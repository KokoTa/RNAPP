/*
 * @Author: KokoTa
 * @Date: 2020-08-19 19:37:22
 * @LastEditTime: 2020-08-24 14:33:23
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/SearchPage.js
 */
import React, {useEffect, useState} from 'react';
import {Text, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import actions from '../action';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import NavigationComponents from '../components/NavigationComponents';
import SearchItem from '../components/SearchItem';
import NavigationStore from '../../utils/NavigationStore';
import LanguageStore from '../../utils/LanguageStore';
import Toast from 'react-native-root-toast';

function SearchPage(props) {
  const {
    search,
    theme,
    language,
    onLoadSearchData,
    onSearchCancel,
    navigation,
    onLoadLanguage,
  } = props;
  const [keyword, setKeyword] = useState('All');
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const arr = [];
    language.forEach((item) => arr.push(item.name));
    onLoadSearchData(keyword, arr, 'token');
    setKeys(arr);
  }, [keyword, language, onLoadSearchData]);

  return (
    <>
      {/* 导航栏 */}
      <NavigationBar
        titleView={
          <TextInput
            style={styles.textInput}
            placeholder="请输入标签名"
            onSubmitEditing={({nativeEvent: {text}}) => setKeyword(text)}
          />
        }
        style={{backgroundColor: theme.themeColor}}
        leftButton={NavigationComponents.getLeftBackButton(() => {
          // 如果正在请求，则中断请求
          onSearchCancel('token');
          // 更新语言标签
          onLoadLanguage();
          navigation.goBack();
        })}
      />
      {/* 列表 */}
      <FlatList
        data={search.items}
        renderItem={(params) => (
          <SearchItem
            item={params.item}
            onSelect={() => {
              NavigationStore.navigation.navigate('WebviewPage', {
                title: params.item.full_name,
                url: params.item.html_url,
              });
            }}
          />
        )}
        keyExtractor={(params) => params.url}
        refreshControl={
          <RefreshControl
            title="Loading"
            titleColor="red"
            tintColor="orange"
            refreshing={search.isLoading}
            onRefresh={() => onLoadSearchData(keyword, keys, 'token')}
          />
        }
        contentInset={{
          bottom: 60,
        }}
      />
      {/* 收藏标签 */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={{...styles.favoriteButton, backgroundColor: theme.themeColor}}
        onPress={async () => {
          // 保存语言标签
          const newLanguage = [...language];
          newLanguage.unshift({
            name: keyword,
            checked: true,
          });
          await LanguageStore.setLanguage(newLanguage);
          Toast.show('保存成功', {
            position: Toast.positions.CENTER,
          });
        }}>
        <Text style={styles.favoriteButtonText}>收藏标签</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonText: {
    fontSize: 18,
    color: 'white',
  },
  textInput: {
    fontSize: 18,
    color: 'white',
  },
});

export default connect(
  (state) => ({
    theme: state.theme,
    search: state.search,
    language: state.language,
  }),
  (dispatch) => ({
    onLoadSearchData: (keyword, keys, token) =>
      dispatch(actions.onLoadSearchData(keyword, keys, token)),
    onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
    onLoadLanguage: () => dispatch(actions.onLoadLanguage()),
  }),
)(SearchPage);
