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
import {getAvatar} from '../../Services/Api';
import {AuthContext} from '../../Services/Context';
const styles = require('../../Styles/Styles');
import ModalAvatar from '../Modal/ModalAvatar';
import baseAvatar from '../../Assets/UserPics/1.png';

const UserProfileHeader = () => {
  const [avatar, setAvatar] = useState(null);
  const {user} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    data = user;
    setModalVisible(!modalVisible);
  };

  let firstName;
  const hadlerName = () => {
    let userName;
    if (user.user !== undefined) {
      userName = user.user.name;
      reactotron.log('user', user);
      firstName = userName.split(' ').slice(0, -1).join(' ');
      setName(firstName);
    } else {
      setName('User');
    }
  };

  const getAvatarUser = async () => {
    const response = await getAvatar(user.token)
      .then(response => {
        console.log('data', response);
      })
      .catch(error => {
        console.log('error', error);
      });
    return response;
  };

  useEffect(() => {
    console.log(avatar);
    getAvatarUser();
    hadlerName();
  }, []);

  console.log(avatar);
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: 250,
        backgroundColor: '#8482D6',
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        paddingBottom: 20,
      }}>
      <TouchableOpacity onPress={handleOpenModal}>
        <Image
          style={{borderRadius: 100, height: 100, width: 100}}
          source={
            avatar !== null ? {avatar} : require('../../Assets/UserPics/1.png')
          }
        />
      </TouchableOpacity>
      <MainTitle label={'Welcome ' + name} />
      {modalVisible && (
        <ModalAvatar data={data} toggleModal={handleOpenModal} />
      )}
    </View>
  );
};

export default UserProfileHeader;
