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

export async function storeAvatar(value) {
  try {
    await AsyncStorage.setItem('@storage_Avatar', value);
  } catch (e) {
    reactotron.log('storeAvatar error', e);
  }
}

export async function getAvatar() {
  try {
    const value = await AsyncStorage.getItem('@storage_Avatar');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    reactotron.log('getAvatar error', e);
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

export async function storeDataUser(value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_user', jsonValue);
  } catch (e) {
    reactotron.log('storeData error', e);
  }
}

export async function dataUser() {
  const user = JSON.parse(await getData('@storage_user'));
  return user;
}

export async function removeData(value) {
  try {
    await AsyncStorage.removeItem(value);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
}
