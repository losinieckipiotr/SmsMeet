import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '../Colors';
import { MyButton } from './Button';

interface FooterProps {
  onHistoryPress?: () => void;
  onMeetPress?: () => void;
}

const Footer = (props: FooterProps) => {
  const { onHistoryPress, onMeetPress } = props;
  return (
    <View style={styles.footer}>
      <MyButton
        text={'HISTORY'}
        style={AppColors.themeL4}
        onPress={onHistoryPress}
      />
      <MyButton
        text={'MEET'}
        style={AppColors.themeL4}
        onPress={onMeetPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: StyleSheet.flatten([
    {
      height: 75,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    AppColors.themeD1,
  ]),
});

export {
  Footer,
  FooterProps,
};
