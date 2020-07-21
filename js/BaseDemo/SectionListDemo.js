/*
 * @Author: KokoTa
 * @Date: 2020-07-15 09:38:17
 * @LastEditTime: 2020-07-15 11:02:19
 * @Description:
 */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  SectionList,
} from 'react-native';

const SectionListDemo = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([
    {
      data: ['北京', '上海', '广州', '深圳'],
      title: '分类1',
    },
    {
      data: ['泉州', '福州', '厦门'],
      title: '分类2',
    },
    {
      data: ['漳州', '杭州', '徐州', '株洲'],
      title: '分类3',
    },
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

  const _renderSectionHeader = ({section}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const loadData = (type) => {
    let newCities = [];
    if (type === 'refresh') {
      newCities = [...cities].reverse();
    }
    if (type === 'more') {
      newCities = [...cities, ...cities];
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
      <SectionList
        sections={cities}
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
        renderSectionHeader={(section) => _renderSectionHeader(section)}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
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
  sectionHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lightblue',
  },
  sectionHeaderText: {
    fontSize: 20,
  },
  seperator: {
    height: 1,
    backgroundColor: 'gray',
    flex: 1,
  },
});

export default SectionListDemo;
