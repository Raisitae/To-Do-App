import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotron from 'reactotron-react-native';

export async function storeData(value) {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    reactotron.log('storeData error', e);
  }
}

export async function dataAsync() {
  const token = await getData('@storage_Key');
  return token;
}

export async function getData(value) {
  try {
    const jsonValue = await AsyncStorage.getItem(value);
    return jsonValue;
  } catch (e) {
    reactotron.log('getData error' + e);
  }
}

export async function removeData(value) {
  try {
    await AsyncStorage.removeItem(value);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
}
