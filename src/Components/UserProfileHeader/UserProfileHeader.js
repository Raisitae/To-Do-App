import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import MainTitle from '../Titles/MainTitle';
import reactotron from 'reactotron-react-native';
import {dataAsync} from '../../Services/LocalStorage';
import {getAvatar} from '../../Services/Api';
import {AuthContext} from '../../Services/Context';
const styles = require('../../Styles/Styles');

const UserProfileHeader = () => {
  const [avatar, setAvatar] = useState('');
  const {user} = useContext(AuthContext);
  const [name, setName] = useState('');

  let firstName;
  const hadlerName = () => {
    let userName;
    if (user.user !== undefined) {
      userName = user.user.name;
      reactotron.log('user', user);
      setName(user.user.name);
    } else {
      setName('User');
    }
    firstName = userName.split(' ').slice(0, -1).join(' ');
    setName(firstName);
  };

  const getAvatarUser = async () => {
    const response = await getAvatar(user.token)
      .then(response => {
        reactotron.log('data', response);
      })
      .catch(error => {
        reactotron.log(error);
      });
    return response;
  };

  useEffect(() => {
    setAvatar(
      'https://upload.wikimedia.org/wikipedia/commons/0/04/So_happy_smiling_cat.jpg',
    );
    getAvatarUser();
    hadlerName();
  }, []);

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        width: '100%',
        backgroundColor: '#50C2C9',
        height: '40%',
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        borderBottomRightRadius: 500,
        paddingBottom: 40,
        paddingLeft: 30,
      }}>
      <TouchableOpacity>
        <Image
          style={{borderRadius: 100, height: 100, width: 100}}
          source={{uri: avatar}}
        />
      </TouchableOpacity>
      <MainTitle label={'Welcome ' + name} />
    </View>
  );
};

export default UserProfileHeader;
