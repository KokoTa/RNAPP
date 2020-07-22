import React from 'react';
import {connect} from 'react-redux';
import actions from '../action';
const {createAppContainer} = require('react-navigation');
const {createStackNavigator} = require('react-navigation-stack');
const {Text, View, Button} = require('react-native');

const randomColor = () =>
  '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);

function Home(props) {
  const {themeColor, onThemeChange} = props;
  return (
    <View>
      <Text style={{color: themeColor}}>Hello</Text>
      <Button
        title={'Change Color'}
        onPress={() => {
          onThemeChange({themeColor: randomColor()});
        }}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    themeColor: state.themeReducer.themeColor,
  };
};
const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme)),
  };
};

const HomeConnect = connect(mapStateToProps, mapDispatchToProps)(Home);

function Other() {
  return <Text>Other</Text>;
}

const stackNavigator = createStackNavigator({
  Home: {
    screen: HomeConnect,
  },
  Other: {
    screen: Other,
  },
});

const AppNavigator = createAppContainer(stackNavigator);

export default AppNavigator;
