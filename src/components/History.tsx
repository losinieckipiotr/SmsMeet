import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppColors } from '../Colors';
import { MyButton } from './Button';
import { Header } from './Header';
import { HistoryList, HistoryValue } from './HistoryList';

interface HistoryProps {
  data: HistoryValue[];
  onBackPress: () => void;
}

const History = (props: HistoryProps) => {
  const { data, onBackPress } = props;

  return(
    <View style={styles.historyContainer}>
      <Header text={'History'}/>
      <HistoryList data={data}/>
      <View style={styles.buttonContainer}>
        <MyButton
          text={'BACK'}
          style={styles.button}
          onPress={onBackPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: StyleSheet.flatten([
    {
      flex: 1,
      elevation: 5,
    },
    AppColors.themeL3,
  ]),
  buttonContainer: StyleSheet.flatten([
    {
      justifyContent: 'center',
      flexDirection: 'row',
    },
    AppColors.themeD1,
  ]),
  button: StyleSheet.flatten([
    AppColors.themeL4,
    { width: undefined, flex: 1, margin: 10 },
  ]),
});

export {
  History,
  HistoryProps,
};
