/*
 * @Author: KokoTa
 * @Date: 2020-08-19 19:37:22
 * @LastEditTime: 2020-08-20 15:18:06
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/ThemePage.js
 */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import NavigationComponents from '../components/NavigationComponents';
import actions from '../action';
import Colors from '../static/themeColor.json';

function ThemePage(props) {
  const {theme, navigation, onLoadThemeColor, onChangeThemeColor} = props;

  const handleClick = async (color) => {
    await onChangeThemeColor(color);
  };

  return (
    <>
      <NavigationBar
        title="自定义主题"
        statusBar={{
          backgroundColor: theme.themeColor,
        }}
        style={{
          backgroundColor: theme.themeColor,
        }}
        leftButton={NavigationComponents.getLeftBackButton(() =>
          navigation.goBack(),
        )}
      />
      <ScrollView style={{flex: 1}}>
        {Object.keys(Colors).map((colorName) => (
          <TouchableOpacity
            style={{...styles.item, backgroundColor: Colors[colorName]}}
            key={colorName}
            onPress={() => handleClick(Colors[colorName])}>
            <Text style={styles.text}>{Colors[colorName]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    color: 'white',
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
    onLoadThemeColor: () => dispatch(actions.onLoadThemeColor()),
    onChangeThemeColor: (color) => dispatch(actions.onChangeThemeColor(color)),
  }),
)(ThemePage);
