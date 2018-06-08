import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';

import { AppColors } from '../Colors';
import { Separator } from './Separator';

interface HistoryValue {
  date: Date;
  value: string;
}

const HistoryListItem = ({ item }: { item: HistoryValue }) => {
  const date = new Date(item.date);
  const value = item.value;
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.dateFont}>{date.toTimeString()}</Text>
      <Text style={styles.namesFont}>{value}</Text>
    </View>
  );
};

interface HistoryListProps {
  data: HistoryValue[];
}

class HistoryList extends React.PureComponent<HistoryListProps> {
  public render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.data}
        renderItem={(item: ListRenderItemInfo<HistoryValue>) => <HistoryListItem item={item.item}/>}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={Separator}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateFont: StyleSheet.flatten([
    { fontSize: 10 },
    AppColors.textThemeLight,
  ]),
  namesFont: StyleSheet.flatten([
    { fontSize: 16 },
    AppColors.textThemeLight,
  ]),
});

export {
  HistoryList,
  HistoryValue,
};
