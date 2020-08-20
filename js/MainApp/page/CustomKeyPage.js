/*
 * @Author: KokoTa
 * @Date: 2020-08-19 19:37:22
 * @LastEditTime: 2020-08-20 16:03:08
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/CustomKeyPage.js
 */
import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationBar from '../components/NavigationBar';
import NavigationComponents from '../components/NavigationComponents';
import CheckBox from '@react-native-community/checkbox';
import LanguageStore from '../../utils/LanguageStore';
import actions from '../action';

function CustomKeyPage(props) {
  const {theme, language, navigation, onLoadLanguage} = props;
  const [localLanguage, setLocalLanguage] = useState([]); // 保存副本

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(language)); // 不要使用 [...language]，这个只是浅复制
    setLocalLanguage(data);
  }, [language]);

  const handleCheckBox = (item, index) => {
    const newLocalLanguage = localLanguage.map((localItem, localItemIndex) => {
      if (index === localItemIndex) {
        localItem.checked = !localItem.checked;
      }
      return localItem;
    });
    setLocalLanguage(newLocalLanguage);
  };

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
      <ScrollView>
        {localLanguage.map((item, index) => (
          <TouchableOpacity
            key={item.name}
            style={styles.item}
            onPress={() => handleCheckBox(item, index)}>
            <Text style={styles.text}>{item.name}</Text>
            <CheckBox
              style={{...styles.checkbox}}
              tintColor={theme.themeColor} // ios 未选中圈圈颜色
              onCheckColor={theme.themeColor} // ios 选中时勾勾颜色
              onTintColor={theme.themeColor} // ios 选中时圈圈颜色
              tintColors={{true: theme.themeColor, false: theme.themeColor}} // android
              value={item.checked}
            />
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
)(CustomKeyPage);
