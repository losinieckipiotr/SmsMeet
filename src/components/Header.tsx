import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { AppColors } from '../Colors';

interface HeaderProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const Header = (props: HeaderProps) => {
  return (
    <View style={props.style}>
      <View style={{flex: 1}}/>
      <Text style={styles.message}>{props.text}</Text>
      <View style={{flex: 1}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  message: StyleSheet.flatten([
    { fontSize: 16, textAlign: 'center' },
    AppColors.textHeder,
  ]),
});

export {
  Header,
};
