import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Contact } from 'react-native-contacts';

import { AppColors } from '../Colors';
import { Separator } from './Separator';

interface MenuItemProps {
  id: number;
  contact: Contact;
  selected: boolean;
  onPress: (id: number) => void;
}

class MenuItem extends React.PureComponent<MenuItemProps> {
  public render() {
    const { id, contact, selected, onPress } = this.props;
    const firstName = contact.givenName;
    const fullName = contact.familyName ? `${firstName} ${contact.familyName}` : firstName;
    const selectedStyle = selected ? styles.buttonSelected : {};
    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => onPress(id)}
      >
        <Text style={[styles.menuItemText, selectedStyle]}>{fullName}</Text>
      </TouchableOpacity>
    );
  }
}

interface ContactsListProps {
  data: Contact[];
  style: StyleProp<ViewStyle>;
  onItemSelectionChange: (id: number | undefined) => void;
  // TODO menuItemStyle, separatorStyle
}

interface ContactsListState {
  selected?: number;
}

class ContactsList extends React.PureComponent<ContactsListProps, ContactsListState> {
  public constructor(props: ContactsListProps) {
    super(props);

    this.state = {
      selected: undefined,
    };
  }

  public render() {
    const { data, style } = this.props;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        style={style}
        data={data}
        renderItem={this.renderItem}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={Separator}
        extraData={this.state}
      />
    );
  }

  public componentDidUpdate() {
    this.props.onItemSelectionChange(this.state.selected);
  }

  private renderItem = (item: ListRenderItemInfo<Contact>) => {
    const { selected } = this.state;
    return (
      <MenuItem
        id={item.index}
        contact={item.item}
        selected={selected !== undefined && selected == item.index}
        onPress={this.onItemPress}
      />
    );
  }

  private onItemPress = (id: number) => {
    const { selected } = this.state;
    if (selected !== undefined && selected === id) {
      this.setState({ selected: undefined });
    } else {
      this.setState({ selected: id });
    }
  }
}

const styles = StyleSheet.create({
  menuItem: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: StyleSheet.flatten([
    { fontSize: 16 },
    AppColors.textThemeLight,
  ]),
  buttonSelected: AppColors.selectedTextTheme,
});

export {
  ContactsList,
  ContactsListProps,
};
