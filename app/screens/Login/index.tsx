import React, { useState } from 'react';
import { View, TouchableHighlight, Image, Alert, Modal } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import * as loginActions from 'app/actions/loginActions';
import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import NavigationService from 'app/navigation/NavigationService';

interface IState {
  loginReducer: ILoginState;
}

const Login: React.FC = () => {
  const id = useSelector((state: IState) => state.loginReducer.id);
  const [value, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [age, onChangeAge] = React.useState('');
  const dispatch = useDispatch();
  const onLogin = (value1: string, value2: string, value3: string) => dispatch(loginActions.requestLogin(value1, value2, value3));
  const onForgot = () => NavigationService.navigate('ForgotPassword');
  return (
    <View>
      <View>
        <Text accessibilityStates="" style={styles.login}>
          Login User
        </Text>

        <TextInput
          style={styles.TextInputStyles}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          accessibilityStates=""
          placeholder={'User Name'}
        />
        <TextInput
          style={styles.TextInputStyles}
          onChangeText={(text) => onChangeAge(text)}
          value={age}
          accessibilityStates=""
          placeholder={'Age'}
        />
        <TextInput
          style={styles.TextInputStyles}
          onChangeText={(text) => onChangePassword(text)}
          value={password}
          accessibilityStates=""
          placeholder={'Password'}
        />

        <Button
          accessibilityStates=""
          icon="login"
          mode="outlined"
          onPress={() => onLogin(value, password, age)}>
          Login
        </Button>
        <Button
          accessibilityStates=""
          mode="text"
          style={styles.forgot}
          labelStyle={styles.labelStyle}
          onPress={onForgot}>
          Forgot Password
        </Button>
      </View>
    </View>
  );
};

export default Login;
