// import { Button } from 'react-native-paper';
import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';

interface props {
  onPress: any;
  ButtonText: string;
  BackgroundColor: string;
  TextColor: string;
}

const Button = (props: props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={{
        backgroundColor: props.BackgroundColor,
        height: 60,
        borderWidth: 1,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: props.BorderColor,
        marginVertical:10,
      }}>
      <Text style={{ color: props.TextColor }}>{props.ButtonText}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  onPress: () => Alert.alert('Press me'),
  ButtonText: 'Press me',
  BackgroundColor: 'grey',
  TextColor: 'white',
  BorderColor: 'transparent',
};

export default Button;
