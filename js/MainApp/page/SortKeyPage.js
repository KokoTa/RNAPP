/*
 * @Author: KokoTa
 * @Date: 2020-08-19 19:37:22
 * @LastEditTime: 2020-08-20 14:39:09
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/SortKeyPage.js
 */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Alert, TouchableOpacity, Text, View} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import NavigationComponents from '../components/NavigationComponents';
import LanguageStore from '../../utils/LanguageStore';
import actions from '../action';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SortKeyPage(props) {
  const {theme, language, navigation, onLoadLanguage} = props;
  const [localLanguage, setLocalLanguage] = useState([]); // 保存副本

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(language)); // 不要使用 [...language]，这个只是浅复制
    setLocalLanguage(data);
  }, [language]);

  const handleSave = () => {
    Alert.alert('提示', '是否保存', [
      {
        text: '取消',
        onPress: () => navigation.goBack(),
        style: 'cancel',
      },
      {
        text: '确定',
        onPress: async () => {
          // 更新本地数据
          await LanguageStore.setLanguage(localLanguage);
          // 更新 redux 数据
          await onLoadLanguage();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <>
      <NavigationBar
        title="自定义语言"
        statusBar={{
          backgroundColor: theme.themeColor,
        }}
        style={{
          backgroundColor: theme.themeColor,
        }}
        leftButton={NavigationComponents.getLeftBackButton(() =>
          navigation.goBack(),
        )}
        rightButton={NavigationComponents.getSaveButton(() => {
          handleSave();
        })}
      />
      <View style={{flex: 1}}>
        <DraggableFlatList
          data={localLanguage}
          renderItem={({item, drag}) => (
            <TouchableOpacity style={styles.item} onPressIn={drag}>
              <Ionicons
                name="swap-vertical"
                size={20}
                color={theme.themeColor}
                style={{paddingRight: 10}}
              />
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.name}`}
          onDragEnd={({data}) => setLocalLanguage(data)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
});

export default connect(
  (state) => ({
    theme: state.theme,
    language: state.language,
  }),
  (dispatch) => ({
    onLoadLanguage: () => dispatch(actions.onLoadLanguage()),
  }),
)(SortKeyPage);
