/*
 * @Author: KokoTa
 * @Date: 2020-08-10 20:22:02
 * @LastEditTime: 2020-08-20 10:58:48
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /AwesomeProject/js/MainApp/navigator/PopularNavigator.js
 */
import React, {useEffect} from 'react';
import PopularPage from '../page/PopularPage';
import NavigationBar from '../components/NavigationBar';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import NavigationStore from '../../utils/NavigationStore';
import actions from '../action';
import {createAppContainer} from 'react-navigation';

// 自定义导航栏
const CustomNavigationBar = (props) => {
  const {theme} = props;
  return (
    <NavigationBar
      title="最热"
      statusBar={{
        backgroundColor: theme.themeColor,
      }}
      style={{
        backgroundColor: theme.themeColor,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  theme: state.theme,
});
const ConnectNavigationBar = connect(mapStateToProps)(CustomNavigationBar);

// 构造顶部 tab 结构数据
const createTabs = (list = [{name: 'js', checked: true}]) => {
  let tabs = {};
  list.forEach((tabItem) => {
    if (tabItem.checked) {
      tabs[tabItem.name] = {
        screen: (props) => <PopularPage {...props} storeName={tabItem.name} />,
      };
    }
  });
  return tabs;
};

// 由于 navigation 4.x 不支持函数的赋值方式，所以用 class 来解决
// 但是类方法用到了 static，意味着无法用动态的方式来生成 PopularNavigator，因此还是直接使用套 createAppContainer 的方式来实现吧 = =
// class PopularNavigatorWrap extends Component {
//   static router = PopularNavigator.router;
//   render() {
//     NavigationStore.setNavigation(this.props.navigation);
//     return (
//       <>
//         <ConnectNavigationBar />
//         <PopularNavigator navigation={this.props.navigation} />
//       </>
//     );
//   }
// }

const PopularNavigatorWrap = (props) => {
  const {navigation, language, onLoadLanguage} = props;

  useEffect(() => {
    // 存储第一个 createAppContainer 的 navigation
    NavigationStore.setNavigation(navigation);
  }, [navigation]);

  useEffect(() => {
    onLoadLanguage();
  }, [onLoadLanguage]);

  const PopularNavigator =
    language && language.length
      ? createAppContainer(
          createMaterialTopTabNavigator(createTabs(language), {
            tabBarOptions: {
              upperCaseLabel: false,
              scrollEnabled: true,
            },
            lazy: true,
          }),
        )
      : () => null;

  return (
    <>
      <ConnectNavigationBar />
      <PopularNavigator />
    </>
  );
};

export default connect(
  (state) => ({
    language: state.language,
  }),
  (dispatch) => ({
    onLoadLanguage: () => dispatch(actions.onLoadLanguage()),
  }),
)(PopularNavigatorWrap);
