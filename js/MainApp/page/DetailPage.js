/*
 * @Author: KokoTa
 * @Date: 2020-08-13 11:53:09
 * @LastEditTime: 2020-08-14 17:41:04
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/page/DetailPage.js
 */
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import NavigationBar from '../components/NavigationBar';
import NavigationComponents from '../components/NavigationComponents';
import useHandleBack from '../hook/useHandleBack';
import {FavoriteStore, FAVORITE_HOT} from '../../utils/FavoriteStore';
import {View} from 'react-native';
import action from '../action';

function DetailPage(props) {
  const {theme, navigation, popular, onChangePopularFavorite} = props;
  const {html_url, name, storeName} = navigation.state.params;
  const [navState, setNavState] = useState(null);
  const webview = useRef();
  const [item, setItem] = useState(navigation.state.params);

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

  // 收藏状态处理
  useEffect(() => {
    const store = popular[storeName];
    const targetItem = store.items.find((i) => i.html_url === html_url);
    setItem(targetItem);
  }, [popular, storeName, html_url]);

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
        rightButton={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {NavigationComponents.getStarButton(
              item.isFavorite,
              (isFavorite) => {
                // 更新对应项的 storage 状态
                FavoriteStore.toggleItems(FAVORITE_HOT, item, isFavorite);
                // 更新对应项的 redux 状态
                onChangePopularFavorite(storeName, item, isFavorite);
              },
            )}
            {NavigationComponents.getShareButton()}
          </View>
        }
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
  popular: state.popular,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePopularFavorite: (storeName, item, isFavorite) =>
    dispatch(action.onChangePopularFavorite(storeName, item, isFavorite)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
