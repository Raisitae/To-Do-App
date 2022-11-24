import React from 'react';
import {Pressable, Text} from 'react-native';

const styles = require('../../Styles/Styles');

const Button = textButton => {
  return (
    <Pressable {...textButton} style={textButton.style}>
      <Text style={styles.buttonLabel}>{textButton.label}</Text>
    </Pressable>
  );
};

export default Button;
