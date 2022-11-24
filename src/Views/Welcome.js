import React from 'react';
import {
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import elipse from '../Assets/elipse.png';
import onboarding from '../Assets/onboarding.png';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
import MainText from '../Components/Texts/MainText';
const styles = require('../Styles/Styles');
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import texts from '../Local/en';

const Welcome = () => {
  const navigation = useNavigation();

  const where = () => {
    navigation.navigate('Login');
  };

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

  return (
    <SafeAreaView style={styles.containerEnd}>
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
          <Image style={styles.imgTitle} source={onboarding} />
          <MainTitle label={texts.welcome.mainTitle} />
          <MainText label={texts.welcome.mainText1} />
          <MainText label={texts.welcome.mainText2} />
          <MainText label={texts.welcome.mainText3} />
          <MainText label={texts.welcome.mainText4} />
        </View>
        <Button
          label={texts.welcome.btnStarted}
          style={styles.button}
          onPress={where}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
