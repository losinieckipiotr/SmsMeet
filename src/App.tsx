import React, { Component, PureComponent } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  PermissionsAndroid,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message: 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

interface ContactsListProps {
  style: StyleProp<ViewStyle>;
}

class ContactsList extends PureComponent<ContactsListProps> {
  public render() {
    const data = [
      'contact1',
      'contact2',
      'contact3',
      'contact4',
      'contact5',
      'contact1',
      'contact2',
      'contact3',
      'contact4',
      'contact5',
      'contact1',
      'contact2',
      'contact3',
      'contact4',
      'contact5',
      'contact1',
      'contact2',
      'contact3',
      'contact4',
      'contact5',
      'contact1',
      'contact2',
      'contact3',
      'contact4',
      'contact5',
      'contact1',
      'contact2',
      'contact3',
      'contact4',
      'contact5',
    ];
    return (
      <FlatList
        style={this.props.style}
        data={data}
        renderItem={(item: ListRenderItemInfo<string>) => {
          return (
            <View
              style={{
                width: '100%',
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                }}>
                {item.item}
              </Text>
            </View>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{width: '100%', height: 1, backgroundColor: 'black'}}/>}
      />
    );
  }
}

export default class App extends Component<{}> {
  public componentDidMount() {
    // TODO
    requestCameraPermission();
  }

  public render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <ContactsList style={{flex: 1, backgroundColor: 'pink'}}/>
          <ContactsList style={{flex: 1, backgroundColor: 'lightskyblue'}}/>
        </View>
        <View style={styles.conteiner2}>
          <View
            style={{
              width: 100,
              height: 50,
              backgroundColor: 'skyblue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>History</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              backgroundColor: 'greenyellow',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Meet</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  conteiner2: {
    height: 75,
    backgroundColor: '#F5FCFF',
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
