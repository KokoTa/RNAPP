/*
 * @Author: KokoTa
 * @Date: 2020-08-17 19:35:31
 * @LastEditTime: 2020-08-18 11:28:59
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/AboutPage.js
 */
import React, {useState} from 'react';
import {
  View,
  Image,
  Platform,
  Dimensions,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from 'react-redux';
import {globalStyle} from '../common/globalStyle';
import {
  IOS_NAV_BAR_HEIGHT,
  ANDROID_NAV_BAR_HEIGHT,
} from '../components/NavigationBar';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import NavigatorComponents from '../components/NavigationComponents';
import NavigationStore from '../../utils/NavigationStore';
import NavigationComponents from '../components/NavigationComponents';
import {menuConfig} from '../config/menuConfig';
import MenuItemGroup from '../components/MenuItemGroup';
import Toast from 'react-native-root-toast';
import Clipboard from '@react-native-community/clipboard';

const AVATAR_SIZE = 90; // 头像大小
const PARALLAX_HEADER_HEIGHT = 270; // Prallax 区域高度
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios' ? IOS_NAV_BAR_HEIGHT : ANDROID_NAV_BAR_HEIGHT; // 顶部栏高度

function AboutPage(props) {
  const {theme, navigation} = props;
  const window = Dimensions.get('window');
  const [show, setShow] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: getStatusBarHeight(true),
          backgroundColor: theme.themeColor,
          zIndex: 100,
        }}>
        <StatusBar {...props.statusBar} />
      </View>
      <ParallaxScrollView
        backgroundColor={theme.themeColor}
        contentBackgroundColor={globalStyle.backgroundColor}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image
              source={{
                uri: 'http://fakeimg.pl/400x400?font=lobster',
                width: window.width,
                height: PARALLAX_HEADER_HEIGHT,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: window.width,
                backgroundColor: 'rgba(0, 0, 0, .5)',
                height: PARALLAX_HEADER_HEIGHT,
              }}
            />
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'http://fakeimg.pl/200x200?font=lobster',
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
              }}
            />
            <Text style={styles.sectionSpeakerText}>About App</Text>
            <Text style={styles.sectionTitleText}>Created by KokoTa</Text>
          </View>
        )}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>About</Text>
          </View>
        )}
        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            {NavigatorComponents.getLeftBackButton(() => {
              console.log(navigation, NavigationStore.navigation);
              navigation.goBack();
            })}
            {NavigationComponents.getShareButton(() => {})}
          </View>
        )}>
        {/* 菜单项组，可折叠 */}
        <MenuItemGroup
          titleConfig={menuConfig.About_Author}
          isShow={show}
          children={[
            {
              text: 'Phone',
              account: '12312312312',
            },
            {
              text: 'Email',
              account: '584847514@qq.com',
            },
          ]}
          callBack={(type, data) => {
            if (type === 'title') {
              setShow(data);
            } else {
              if (data.text === 'Phone') {
                Clipboard.setString(data.account);
                Toast.show('号码已复制到剪贴板', {
                  position: Toast.positions.CENTER,
                });
              }
              if (data.text === 'Email') {
                Clipboard.setString(data.account);
                Toast.show('邮箱已复制到剪贴板', {
                  position: Toast.positions.CENTER,
                });
              }
            }
          }}
        />
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'flex-end',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  fixedSection: {
    position: 'absolute',
    width: window.width,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: globalStyle.line,
});

const mapStateToProps = (state) => ({
  theme: state.theme,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
