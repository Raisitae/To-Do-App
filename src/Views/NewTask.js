import {View, Text, KeyboardAvoidingView, StatusBar, Image} from 'react-native';
import React from 'react';
const styles = require('../Styles/Styles');
import elipse from '../Assets/elipse.png';

const NewTask = () => {
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
    </KeyboardAvoidingView>
  );
};

export default NewTask;
