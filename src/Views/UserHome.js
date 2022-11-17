import React from 'react';
import {View, Image, StatusBar, KeyboardAvoidingView} from 'react-native';
import elipse from '../Assets/elipse.png';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
const styles = require('../Styles/Styles');
import Reactotron from 'reactotron-react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserHome = () => {
  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';
  const navigation = useNavigation();
  const [token, setToken] = React.useState('');

  //obtenemos el token del storage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        // value previously stored
        setToken(value);
        return token;
      }
    } catch (e) {
      // error reading value
    }
  };

  getData();

  // funcion para cerrar sesion
  const logout = () => {
    axios
      .post(
        `${baseUrl}/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log(response);
        AsyncStorage.removeItem('@storage_Key');
        navigation.navigate('Welcome');
      })
      .catch(error => {
        console.log(error);
      });

    AsyncStorage.removeItem('@storage_Key');
    navigation.navigate('Welcome');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={elipse} />
      <View
        style={{
          ...styles.mainOnboarding,
          paddingBottom: 20,
          justifyContent: 'space-around',
        }}>
        <View style={styles.center}>
          <MainTitle label={'Al fin lograste entrar!!!'} />
        </View>
        <Button
          label={'Create new task'}
          onPress={() => {
            navigation.navigate('NewTask');
          }}
        />
        <Button label={'Log out'} onPress={logout} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserHome;
