/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import Navigator from 'app/navigation';
import configureStore from 'app/store/configureStore';
import { IThemeState } from './models/reducers/theme';

import { isEmulator } from 'react-native-device-info';
// import Toast from 'react-native-toast-message';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
};

const { persistor, store } = configureStore();

interface IState {
  themeReducer: IThemeState;
}

const RootNavigation: React.FC = () => {
  const isDark = useSelector((state: IState) => state.themeReducer.isDark);
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const paperTheme = isDark ? PaperDarkTheme : PaperDefaultTheme;

  useEffect(() => {
    isEmulator().then((value) => {
      console.log(value);
      if (value === false) {
        Alert.alert('You are secure and login by Phone');
      } else {
        Alert.alert('Your are running in Emulator, You are not secure');
      }
    });
  });

  return (
    <PaperProvider theme={paperTheme}>
      <Navigator theme={combinedTheme} />
    </PaperProvider>
  );
};

const Entrypoint: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default Entrypoint;
