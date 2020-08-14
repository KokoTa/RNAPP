/*
 * @Author: KokoTa
 * @Date: 2020-08-14 09:43:04
 * @LastEditTime: 2020-08-14 09:54:33
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/components/StarItem.js
 */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

function StarItem(props) {
  const {theme, isFavorite, toggle} = props;

  return (
    <TouchableOpacity style={{padding: 6}} onPress={() => toggle(!isFavorite)}>
      <FontAwesome
        name={isFavorite ? 'star' : 'star-o'}
        size={26}
        style={{color: theme.themeColor}}
      />
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(StarItem);
