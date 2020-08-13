/*
 * @Author: KokoTa
 * @Date: 2020-08-13 11:53:09
 * @LastEditTime: 2020-08-13 16:55:09
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/DetailPage.js
 */
import React, {useState, useCallback, useRef} from 'react';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import NavigationBar from '../components/NavigationBar';
import NavigationComponents from '../components/NavigationComponents';
import useHandleBack from '../hook/useHandleBack';

function DetailPage(props) {
  const {theme, navigation} = props;
  const {html_url, name} = navigation.state.params;
  const [navState, setNavState] = useState(null);
  const webview = useRef();

  const webViewGoBack = useCallback(() => {
    if (navState && navState.canGoBack) {
      // webview 的导航状态
      webview.current.goBack();
    } else {
      // 应用的导航状态
      navigation.goBack();
    }
  }, [navState, navigation]);

  useHandleBack(webViewGoBack);

  return (
    <>
      <NavigationBar
        title={name}
        statusBar={{
          backgroundColor: theme.themeColor,
        }}
        style={{
          backgroundColor: theme.themeColor,
        }}
        leftButton={NavigationComponents.getLeftBackButton(() =>
          webViewGoBack(),
        )}
        rightButton={NavigationComponents.getShareButton()}
      />
      <WebView
        ref={webview}
        source={{uri: html_url}}
        startInLoadingState={true}
        onNavigationStateChange={(navigationState) =>
          setNavState(navigationState)
        }
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(DetailPage);
