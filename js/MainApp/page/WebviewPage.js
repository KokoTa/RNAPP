/*
 * @Author: KokoTa
 * @Date: 2020-08-13 11:53:09
 * @LastEditTime: 2020-08-19 20:02:21
 * @LastEditors: KokoTa
 * @Description: DetailPage 的简化版
 * @FilePath: /AwesomeProject/js/MainApp/page/WebviewPage.js
 */
import React, {useState, useCallback, useRef} from 'react';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import NavigationBar from '../components/NavigationBar';
import NavigationComponents from '../components/NavigationComponents';
import useHandleBack from '../hook/useHandleBack';
import action from '../action';

function WebviewPage(props) {
  const {theme, navigation} = props;
  const {url, title} = navigation.state.params;
  const [navState, setNavState] = useState(null);
  const webview = useRef();

  // webview 和 应用 导航处理
  const webViewGoBack = useCallback(() => {
    if (navState && navState.canGoBack) {
      // webview 的导航状态
      webview.current.goBack();
    } else {
      // 应用的导航状态
      navigation.goBack();
    }
  }, [navState, navigation]);

  // 安卓物理返回键处理
  useHandleBack(webViewGoBack);

  return (
    <>
      <NavigationBar
        title={title}
        statusBar={{
          backgroundColor: theme.themeColor,
        }}
        style={{
          backgroundColor: theme.themeColor,
        }}
        leftButton={NavigationComponents.getLeftBackButton(() =>
          webViewGoBack(),
        )}
      />
      <WebView
        ref={webview}
        source={{uri: url}}
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
  popular: state.popular,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePopularFavorite: (storeName, item, isFavorite) =>
    dispatch(action.onChangePopularFavorite(storeName, item, isFavorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WebviewPage);
