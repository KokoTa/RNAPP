/*
 * @Author: KokoTa
 * @Date: 2020-08-13 14:10:06
 * @LastEditTime: 2020-08-13 14:18:07
 * @LastEditors: KokoTa
 * @Description: 由于有 createAppContainer 嵌套，导致 navigation 截断，因此需要一个全局变量来存储最上层的 navigation
 * @FilePath: /AwesomeProject/js/utils/NavigationStore.js
 */
export default class NavigationStore {
  static navigation = null;

  static setNavigation = (nav) => (this.navigation = nav);
}
