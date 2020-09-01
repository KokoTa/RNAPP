<!--
 * @Author: KokoTa
 * @Date: 2020-07-21 09:01:10
 * @LastEditTime: 2020-09-01 09:36:06
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: /AwesomeProject/README.md
-->
# React Native 开发注意事项

1. `react-navigation 4.x` 嵌套 createAppContainer 会导致 warning 警告，应该使用 [类的方式](https://reactnavigation.org/docs/2.x/common-mistakes/) 完成嵌套路由。但对于动态生成的 Navigator 则无能为力，参考 PopularNavigator
2. PopularNavigator 多包裹了一层 createAppContainer，会导致 navigation 之间存在作用域隔离，比如 top tab 页面中 navigation.navigate 跳不到 bottom tab 的页面，因此需要有一个静态类来存储另外一个作用域的 navigation 以实现跨作用域调用
3. 只有 createAppContainer 有 `onNavigationStateChange` 函数，用于监听所有路由的变化，但对于包裹在另外一层的 createAppContainer 来说，点击并不会触发这个钩子，参考 PopularNavigator
4. `fetch` 返回错误的 http 码时不会 reject，而是 resolve 且 ok 属性设为 false。`axios` 只要 http 不是 200 就会 reject
5. `PopularItem` 的 star 点击没有渐变效果是因为渲染速度跟不上数据变化速度
6. 不要用随机数来赋值列表项的 key，性能极差
7. [react-native-debugger](https://github.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md)
8. 关于 `yarn android` 报错问题：比如之前尝试接友盟的包，构建后发现报错，`yarn android` 并不会重新构建整个项目，而是在构建后的文件基础上再构建，这就导致了引用一些错误包后，构建的项目就废了，回不去了。此时要 idea -> build -> Clean Project -> Rebuild Project 解决，本质上就是删掉缓存重新构建的意思
9. 打包工具：[CodePush](https://www.npmjs.com/package/code-push-cli) [react-native-code-push](https://github.com/microsoft/react-native-code-push) [react-native-code-push Android配置](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-android.md)