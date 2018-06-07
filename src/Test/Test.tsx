import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

const getNums = () => {
  const nums = [];
  for (let i = 0; i < 10; i++) {
    nums.push(i);
  }
  return nums;
};

export default class App extends Component {
  public render() {
    return (
      <View>
        <Text>SLAYER {getNums().toString()}</Text>
      </View>
    );
  }
}
