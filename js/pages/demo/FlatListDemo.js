/*
 * @Author: KokoTa
 * @Date: 2020-07-14 10:29:15
 * @LastEditTime: 2020-07-15 11:00:54
 * @Description:
 */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

const FlatListDemo = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([
    '北京',
    '上海',
    '广州',
    '深圳',
    '泉州',
    '福州',
    '厦门',
    '漳州',
    '杭州',
    '徐州',
    '株洲',
  ]);
  const [timer, setTimer] = useState(0);

  const _renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };

  const _getIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          color="red"
          size="large"
          animating={true}
        />
        <Text style={styles.indicatorText}>正在加载更多</Text>
      </View>
    );
  };

  const loadData = (type) => {
    let newCities = [];
    if (type === 'refresh') {
      newCities = [...cities].reverse();
    }
    if (type === 'more') {
      newCities = [...cities, '其他'];
    }

    setLoading(true);
    const t = setTimeout(() => {
      setCities(newCities);
      setLoading(false);
    }, 3000);
    setTimer(t);
  };

  // 清除定时器
  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cities}
        renderItem={(data) => _renderItem(data)}
        keyExtractor={(item, index) => item + index}
        // refreshing={loading}
        // onRefresh={() => loadData()}
        refreshControl={
          <RefreshControl
            title="loading" // IOS 有 Android 没有
            colors={['red']} // android
            tintColor={['blue']} // ios
            titleColor={['blue']} // ios
            refreshing={loading}
            onRefresh={() => loadData('refresh')}
          />
        }
        ListFooterComponent={() => _getIndicator()}
        onEndReached={() => loadData('more')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 20,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
  indicatorText: {
    marginBottom: 10,
  },
});

export default FlatListDemo;
