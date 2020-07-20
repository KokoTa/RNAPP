/*
 * @Author: KokoTa
 * @Date: 2020-07-17 10:42:46
 * @LastEditTime: 2020-07-17 16:15:14
 * @Description:
 */

export default class NavigationUtil {
  static navigation = null;

  static goPage(page, params) {
    if (!this.navigation) {
      console.warn('no navigation');
      return;
    }
    this.navigation.navigate(page, params);
  }

  static resetToHomePage(props) {
    const {navigation} = props;
    navigation.navigate('HomePage');
  }
}
