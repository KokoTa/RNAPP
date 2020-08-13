/*
 * @Author: KokoTa
 * @Date: 2020-08-12 20:14:49
 * @LastEditTime: 2020-08-13 11:49:19
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/TrendingDialog.js
 */
import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Type from '../action/type';
import {getStatusBarHeight} from 'react-native-status-bar-height';

function TimeSpan(showText, searchText) {
  this.showText = showText;
  this.searchText = searchText;
}

const TimeSpans = [
  new TimeSpan('今天', 'since=daily'),
  new TimeSpan('本周', 'since=weekly'),
  new TimeSpan('本月', 'since=monthly'),
];

export default function TrendingDialog(props) {
  const {onClose, onSelect, visible} = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}>
      <TouchableOpacity style={styles.container} onPress={() => onClose()}>
        {/* 三角形 */}
        <MaterialIcons name="arrow-drop-up" size={36} style={styles.arrow} />
        {/* 项列表 */}
        <View style={styles.content}>
          {TimeSpans.map((span) => (
            <TouchableOpacity
              onPress={() => {
                onClose();
                // onSelect(span); // 这里改造一下，用 emit api 来处理
                DeviceEventEmitter.emit(
                  Type.DEVICE_EMIT_TIME_SPAN_CHANGE,
                  span,
                );
              }}
              key={span.searchText}>
              <View style={styles.span}>
                <Text style={styles.text}>{span.showText}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    flex: 1,
    alignItems: 'center',
    paddingTop: getStatusBarHeight(true),
  },
  arrow: {
    marginTop: 40,
    color: 'white',
    padding: 0,
    margin: -16,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 3,
  },
  span: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    padding: 8,
    paddingHorizontal: 26,
  },
});
