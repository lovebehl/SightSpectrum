import React from 'react';
import { View, Alert, Text } from 'react-native';
// import { Button } from 'react-native-paper';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/actions/loginActions';
import styles from './styles';
import SwipeButton from 'rn-swipe-button';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const { username, age, password } = useSelector((state: any) => state.loginReducer);

  return (
    <View style={styles.container}>
      <Text>User Name : {username}</Text>
      <Text>Age : {age}</Text>
      <Text>Password : {password}</Text>
      <Button
        BackgroundColor={'transparent'}
        TextColor={'black'}
        BorderColor={'black'}
        ButtonText={'Logout'}
        onPress={() => onLogout()}
      />
      <Button
        BackgroundColor={'transparent'}
        TextColor={'black'}
        BorderColor={'black'}
        onPress={() => Alert.alert('Press 1 variation Transparent Button')}
      />
      <Button
        BackgroundColor={'grey'}
        TextColor={'#ffffff'}
        onPress={() => Alert.alert('Press 2 variation Button')}
      />
      <Button
        BackgroundColor={'lightblue'}
        TextColor={'#ffffff'}
        onPress={() => Alert.alert('Press 3 variation Button')}
      />
      <SwipeButton
        disabled={false}
        //disable the button by doing true (Optional)
        swipeSuccessThreshold={50}
        height={45}
        //height of the button (Optional)
        width={330}
        //width of the button (Optional)
        title="Swipe to Submit"
        titleFontSize={14}
        //Text inside the button (Optional)
        // thumbIconImageSource={diamond}
        //You can also set your own icon for the button (Optional)
        onSwipeSuccess={() => Alert.alert('Submitted Successfully!')}
        //After the completion of swipe (Optional)
        railFillBackgroundColor="#e688a1" //(Optional)
        railFillBorderColor="#e688ff" //(Optional)
        thumbIconBackgroundColor="#ed9a73" //(Optional)
        thumbIconBorderColor="#ed9aff" //(Optional)
        railBackgroundColor="#bbeaa6" //(Optional)
        railBorderColor="#bbeaff" //(Optional)
      />
    </View>
  );
};

export default Home;
