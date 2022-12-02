import React, {useState, useEffect, useContext} from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import MainTitle from '../Titles/MainTitle';
import reactotron from 'reactotron-react-native';
import {getAvatar} from '../../Services/LocalStorage';
import {AuthContext} from '../../Services/Context';
const styles = require('../../Styles/Styles');
import ModalAvatar from '../Modal/ModalAvatar';
import {useNavigation} from '@react-navigation/native';

const UserProfileHeader = () => {
  const [thisAvatar, thisSetAvatar] = useState(null);
  const {user, avatar} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => {
    data = user;
    setModalVisible(!modalVisible);
    setTimeout(() => {
      handleAvatar();
    }, 300);
    setLoading(false);
  };

  let firstName;
  const handlerName = () => {
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

  const handleAvatar = async () => {
    const avatar = await getAvatar();
    thisSetAvatar(avatar);
    console.log(thisAvatar);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('user', user);
      handlerName();
      handleAvatar();
      setLoading(false);
    });
    return unsubscribe;
  }, [loading]);

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
            thisAvatar !== null
              ? {uri: thisAvatar}
              : {uri: 'https://i.postimg.cc/L6Wwx1D4/Delivery-boy.png'}
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
