/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(true);
  const [isEmulatorStatus, setIsEmulatorStatus] = useState(false);
  const ModalAlert = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../app/assets/alert.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.textStyle}>
              Your are running in Emulator, You are not secure
            </Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Skip</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  };
  useEffect(() => {
    isEmulator().then((value) => {
      console.log(value);
      if (value === false) {
        setIsEmulatorStatus(false);
      } else {
        setIsEmulatorStatus(true);
      }
    });
  });
  return (
    <PaperProvider theme={paperTheme}>
      <Navigator theme={combinedTheme} />
      {isEmulatorStatus && ModalAlert()}
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(0,0,128,0.5)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 0.4,
    width: '70%',
    justifyContent: 'space-around',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
  },
  textStyle: {
    color: 'white',
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  ImageStyle: {
    height: 100,
    width: 100,
  },
});
