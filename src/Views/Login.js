import React, {useContext, useState, useEffect} from 'react';
import {Image, View, StatusBar, KeyboardAvoidingView} from 'react-native';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
import SecondaryTitle from '../Components/Titles/SecondaryTitle';
import HighlightedText from '../Components/Texts/HighlightedText';
import Input from '../Components/Input/Input';
import reactotron from 'reactotron-react-native';
import showMessages from '../Services/ShowMessages';
import texts from '../Local/en';
import {userLogin} from '../Services/Api';
import {AuthContext} from '../Services/Context';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = require('../Styles/Styles');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);

  const handleName = text => {
    setEmail(text);
  };
  const handlePassword = text => {
    setPassword(text);
  };

  const validate = () => {
    if (email === '' && password === '') {
      showMessages(texts.message.emptyFields, 'red');
      return false;
    }
    if (email.length < 5) {
      showMessages(texts.message.noEmail, 'red');
      return false;
    }
    if (password.length === 0) {
      showMessages(texts.message.noPassword, 'red');
      return false;
    } else if (password.length < 7) {
      showMessages(texts.message.invalid, 'red');
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await userLogin(data);
      login({...response.data});
      showMessages(texts.message.logIn, '#31bfb5');
      navigation.navigate('UserHome');
    } catch (e) {
      showMessages(texts.message.invalidUserInformation, 'red');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{...styles.containerEnd}}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={require('../Assets/elipse.png')} />
      <View
        style={{
          ...styles.mainOnboarding,
          justifyContent: 'space-between',
        }}>
        <View style={styles.inputGroup}>
          <MainTitle label={texts.login.mainTitle} />
          <Image
            style={styles.imgTitle}
            source={require('../Assets/login.png')}
          />
          <Input input={texts.login.placeHolderEmail} function={handleName} />
          <Input
            input={texts.login.placeHolderPassword}
            security={true}
            function={handlePassword}
          />
        </View>
        <SecondaryTitle
          label={texts.login.forgotPassword}
          message={texts.message.forgetPassword}
        />
        <View style={styles.inputGroup}>
          <Button label={'Log in'} onPress={onSubmit} style={styles.button} />
          <HighlightedText
            label={texts.login.dontHaveAcc}
            props={texts.login.signUp}
            screenName={'Register'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
