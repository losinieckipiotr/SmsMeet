import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppColors } from '../Colors';

interface HeaderProps {
  text: string;
}

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.message}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: StyleSheet.flatten([
    {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
    },
    AppColors.themeD1,
  ]),
  message: StyleSheet.flatten([
    { fontSize: 16 },
    AppColors.textHeder,
  ]),
});

export {
  Header,
};
