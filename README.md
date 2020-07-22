# React Native

1. [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/getting-started.html) 库需要修改 `MainActivity.java` 配置
2. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 需要修改 `build.gradle` 配置
3. 由于 navigation 之间存在作用域隔离，比如 top tab 页面中的 navigation.navigate 跳不到 bottom tab 的页面，因此需要有一个静态类来存储另外一个作用域的 navigation 以实现跨作用域调用
4. `react-navigation` 中最好只使用一个 createAppContainer，否则会报 warning 错误
