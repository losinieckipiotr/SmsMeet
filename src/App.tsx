import React from 'react';
import { PermissionsAndroid, StyleSheet, View } from 'react-native';
import Contacts, { Contact, PhoneNumber } from 'react-native-contacts';

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
    this.requestSmsPermission();
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
          style={AppColors.themeL3}
          onPress={() => {
            alert('history');
          }}
        />
        <MyButton
          text={'MEET'}
          style={AppColors.themeL2}
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

  private onMeetPress = () => {
    // alert(`${this.state.firstContact} ${this.state.secondContact}`);
    const { contacts, firstContact, secondContact } = this.state;
    const contact1 = contacts[firstContact as number];
    const contact2 = contacts[secondContact as number];
    if (contact1 && contact2) {
      const phoneNumber1 = this.getMobilePhoneNumber(contact1);
      const phoneNumber2 = this.getMobilePhoneNumber(contact2);
      if (phoneNumber1 &&  phoneNumber2) {
        const msg1 = this.getMsg(contact1, contact2, phoneNumber2);
        const msg2 = this.getMsg(contact2, contact1, phoneNumber1);
        alert(msg1 + '\n' + msg2);
      }
    }
  }

  private async requestConntactsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Conntacts permission',
          message: 'We need permisson to read your conntacts.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll((err, contacts: Contact[]) => {
          if (err) {
            throw err;
          }  else {
            console.log(contacts);
            this.setState({ contacts });
          }
        });
      } else {
        console.log('Conntacts permission denied');
        // TODO exit app
      }
    } catch (err) {
      console.warn(err);
      // ?
    }
  }

  private async requestSmsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
          title: 'SMS permission',
          message: 'We need permisson to send SMS',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can send SMS');
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
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
