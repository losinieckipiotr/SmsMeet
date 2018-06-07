import React from 'react';
import { Alert, PermissionsAndroid, StyleSheet, View } from 'react-native';
import Contacts, { Contact, PhoneNumber } from 'react-native-contacts';
import SmsAndroid from 'react-native-sms-android';

import { AppColors } from './Colors';
import { MyButton } from './components/Button';
import { ContactsList } from './components/ContactsList';

interface AppState {
  contacts: Contact[];
  firstContact?: number;
  secondContact?: number;
}

export default class App extends React.PureComponent<{}, AppState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      contacts: [],
    };
  }
  public componentDidMount() {
    if (this.state.contacts.length == 0) {
      this.requestConntactsPermission();
    }
  }

  public render() {
    const { contacts } = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <ContactsList
            data={contacts}
            style={[
              { flex: 1 },
              AppColors.themeD1,
            ]}
            onItemSelectionChange={(id) => {
              this.setState({firstContact: id});
            }}
            />
          <ContactsList
            data={contacts}
            style={[
              { flex: 1 },
              AppColors.themeD2,
            ]}
            onItemSelectionChange={(id) => {
              this.setState({secondContact: id});
            }}
          />
        </View>
        <View style={styles.conteiner2}>
        <MyButton
          text={'HISTORY'}
          style={AppColors.themeL4}
          onPress={() => {
            alert('history');
          }}
        />
        <MyButton
          text={'MEET'}
          style={AppColors.themeL4}
          onPress={this.onMeetPress}
        />
        </View>
      </View>
    );
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
          Alert.alert('Sending invitations', 'Sendig messages success');
        }).catch(() => {
          Alert.alert('Error', 'Somethig goes wrong');
        });
      }).catch(() => {
        Alert.alert('Error', 'Somethig goes wrong');
      });
    };

    Alert.alert(
      'Sending invitations',
      `Do you want to send invitations?\n${msg1}\n${msg2}`,
      [
        { text: 'Cancel', onPress: () => { /**/ }, style: 'cancel'},
        { text: 'OK', onPress: sendMsessages },
      ],
    );
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
            this.setState({ contacts });
          }
        });
      }
      // TODO error handling
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  conteiner2: {
    height: 75,
    backgroundColor: '#2196f3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    height: '100%',
    backgroundColor: 'grey',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
