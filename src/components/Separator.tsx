import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '../Colors';

const Separator = () => <View style={styles.separator}/>;

const styles = StyleSheet.create({
  separator: StyleSheet.flatten([
   {
    alignSelf: 'center',
    width: '62.5%',
    height: 1,
   },
   AppColors.separator,
  ]),
});

export {
  Separator,
};
