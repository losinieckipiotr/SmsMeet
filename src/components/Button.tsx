import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface MyButtonProps extends TouchableOpacityProps {
  text?: string;
}

class MyButton extends React.PureComponent<MyButtonProps> {
  public render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[ styles.default, this.props.style ]}>
        <Text>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 5,
    backgroundColor: '#2196f3',
  },
});

export {
  MyButton,
};
