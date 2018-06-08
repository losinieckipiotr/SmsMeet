import React from 'react';
import {
  Alert,
  AsyncStorage,
  LayoutAnimation,
  PermissionsAndroid,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import Contacts, { Contact, PhoneNumber } from 'react-native-contacts';
import SmsAndroid from 'react-native-sms-android';

import { AppColors } from './Colors';
import { ContactsList } from './components/ContactsList';
import { Header } from './components/Header';
import { HistoryList, HistoryValue } from './components/HistoryList';
import { MyButton } from './components/MyButton';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AppState {
  contacts: Contact[];
  firstContact?: number;
  secondContact?: number;
  showHistory: boolean;
  history: HistoryValue[];
}

export default class App extends React.PureComponent<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      contacts: [],
      firstContact: undefined,
      secondContact: undefined,
      showHistory: false,
      history: [],
    };
  }
  public componentDidMount() {
    if (this.state.contacts.length == 0) {
      this.requestConntactsPermission();
    }
    this.getHistory();
  }

  public render() {
    const { contacts, showHistory, history } = this.state;
    const headerText = showHistory ? 'History' : 'Invite your contacts to meet each other';

    return (
      <View style={{flex: 1}}>
        <Header style={styles.header} text={headerText}/>
        {showHistory &&
          <View style={styles.listsContainer}>
            <HistoryList data={history}/>
          </View>
        }
        {!showHistory &&
          <View style={styles.listsContainer}>
            <ContactsList
              data={contacts}
              style={styles.contactsListLeft}
              onItemSelectionChange={(id) => this.setState({firstContact: id})}
            />
            <ContactsList
              data={contacts}
              style={styles.contactsListRight}
              onItemSelectionChange={(id) => this.setState({secondContact: id})}
            />
          </View>
        }
        <View style={styles.footer}>
          <MyButton
            text={showHistory ? 'BACK' : 'HISTORY'}
            style={AppColors.themeL4}
            onPress={this.onHistoryPress}
            />
          {!showHistory &&
            <MyButton
              text={'MEET'}
              style={AppColors.themeL4}
              onPress={this.onMeetPress}
            />
          }
        </View>
      </View>
    );
  }

  private onHistoryPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState((prevState) => {
      return {
        showHistory: !prevState.showHistory,
      };
    });
  }

  private onMeetPress = () => {
    const { contacts, firstContact = -1, secondContact = 1 } = this.state;
    if (firstContact == secondContact) {
      return;
    }

    const contact1 = contacts[firstContact];
    const contact2 = contacts[secondContact];
    if (!contact1 || !contact2) {
      return;
    }

    const phoneNumber1 = this.getMobilePhoneNumber(contact1);
    const phoneNumber2 = this.getMobilePhoneNumber(contact2);
    if (!phoneNumber1 || !phoneNumber2) {
      return;
    }

    const msg1 = this.getMsg(contact1, contact2, phoneNumber2);
    const msg2 = this.getMsg(contact2, contact1, phoneNumber1);

    const sendMsessages = () => {
      this.sendSms(phoneNumber1, msg1).then(() => {
        this.sendSms(phoneNumber2, msg2).then(() => {
          this.setState((prevState) => {
            const newHistory = prevState.history.slice();
            newHistory.unshift({
              date: new Date(),
              value: `${contact1.givenName} ${contact2.givenName}`,
            });
            this.saveHistory(newHistory);
            return {
              history: newHistory,
            };
          });
          Alert.alert('Sending invitations', 'Invitations sent succesfully!');
        }).catch(() => {
          Alert.alert('Error', 'Something  goes wrong');
        });
      }).catch(() => {
        Alert.alert('Error', 'Something  goes wrong');
      });
    };

    Alert.alert(
      'Sending invitations',
      `Do you want to send invitations?\n${msg1}\n${msg2}`,
      [
        { text: 'Cancel', onPress: () => { /* just hide alert */ }, style: 'cancel'},
        { text: 'OK', onPress: sendMsessages },
      ],
    );
  }

  private sendSms(phoneNumber: string, smsContent: string) {
    return new Promise((resolve, reject) => {
      SmsAndroid.sms(phoneNumber, smsContent, 'sendDirect', (err: string, message: string) => {
        if (!err) {
          resolve(message);
        } else {
          reject(err);
        }
      });
    });
  }

  private async requestConntactsPermission() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Conntacts permission',
          message: 'We need permisson to read your conntacts.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll((err, contacts: Contact[]) => {
          if (!err) {
            if (contacts.length == 0) {
              Alert.alert('Empty contacts list', 'Your contacts list is empty');
            }
            this.setState({ contacts });
          }
        });
      }
      // TODO error handling
  }

  private async getHistory() {
    const historyJSON = await AsyncStorage.getItem('history');
    if (historyJSON === null) {
      AsyncStorage.setItem('history', JSON.stringify([]));
    } else {
      const history = JSON.parse(historyJSON) as HistoryValue[];
      this.setState({ history });
    }
  }

  private async saveHistory(newHistory: HistoryValue[]) {
    const historyJSON = JSON.stringify(newHistory);
    return AsyncStorage.setItem('history', historyJSON);
  }

  private getMobilePhoneNumber = (contact: Contact): string => {
    const phoneNumber: PhoneNumber | undefined = contact.phoneNumbers.find((n) => n.label == 'mobile');
    if (phoneNumber) {
      return phoneNumber.number;
    }
    return '';
  }

  private getMsg = (reciver: Contact, contact: Contact, phoneNumber: string): string => {
    return `${reciver.givenName} please meet ${contact.givenName}. Phone number is ${phoneNumber}`;
  }
}

const styles = StyleSheet.create({
  listsContainer: StyleSheet.flatten([
    {
      flex: 1,
      flexDirection: 'row',
    },
    AppColors.themeL3,
  ]),
  contactsListLeft: StyleSheet.flatten([
    { flex: 1 },
    AppColors.themeL3,
  ]),
  contactsListRight: StyleSheet.flatten([
    { flex: 1 },
    AppColors.themeL3,
  ]),
  header: StyleSheet.flatten([
    {
      height: 60,
      elevation: 5,
    },
    AppColors.themeD1,
  ]),
  footer: StyleSheet.flatten([
    {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      elevation: 5,
    },
    AppColors.themeD1,
  ]),
});
