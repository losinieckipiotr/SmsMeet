import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { AppColors } from '../Colors';

interface MyButtonProps extends TouchableOpacityProps {
  text?: string;
}

const MyButton = (props: MyButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[ styles.default, props.style ]}>
      <Text style={AppColors.textThemeLight}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: StyleSheet.flatten([
    {
      width: 100,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      elevation: 5,
    },
    AppColors.action,
  ]),
});

export {
  MyButton,
};
