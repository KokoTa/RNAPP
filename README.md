<!--
 * @Author: KokoTa
 * @Date: 2020-07-21 09:01:10
 * @LastEditTime: 2020-08-18 20:33:13
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /AwesomeProject/README.md
-->
# React Native

1. [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/getting-started.html) 库需要修改 `MainActivity.java` 配置
2. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 需要修改 `build.gradle` 配置
3. 由于 navigation 之间存在作用域隔离，比如 top tab 页面中的 navigation.navigate 跳不到 bottom tab 的页面，因此需要有一个静态类来存储另外一个作用域的 navigation 以实现跨作用域调用
4. `react-navigation` 中最好只使用一个 createAppContainer，否则会报 warning 错误
5. `fetch` 返回错误的 http 码时不会 reject，而是 resolve 但 ok 属性设为了 false。`axios` 只要 http 不是 200 就会 reject
6. `PopularItem` 的 star 点击没有渐变效果是因为渲染速度跟不上数据变化速度
7. 不要用随机数来赋值列表项的 key
8. 更好的 Debugger 插件: [react-native-debugger](https://github.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md)