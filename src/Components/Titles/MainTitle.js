import React from 'react';
import {Text} from 'react-native';
const styles = require('../../Styles/Styles');

const MainTitle = textContent => {
  return (
    <Text {...textContent} style={styles.textTitle}>
      {textContent.label}
    </Text>
  );
};

export default MainTitle;
