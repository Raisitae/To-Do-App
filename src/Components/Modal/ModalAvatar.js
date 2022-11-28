import react, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
const styles = require('../../Styles/Styles');
import {updateAvatar} from '../../Services/Api';
import {FlatList} from 'react-native-gesture-handler';
import avatarList from '../../Services/Avatar';
import reactotron from 'reactotron-react-native';
import login from '../../Assets/login.png';

const ModalAvatar = ({toggleModal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState('');

  console.log(data.token);
  useEffect(() => {
    setAvatar(avatarList);
  }, []);

  const toggleIt = () => {
    setIsOpen(false);
    toggleModal();
  };

  const handleAvatar = item => {
    updateAvatar(login, data.token);
    toggleIt();
  };

  const renderAvatar = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => handleAvatar(item.url)}
        key={item.id}>
        <Image
          source={{uri: item.url}}
          style={{borderRadius: 100, height: 100, width: 100}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modalContainer}>
        <View
          style={{
            ...styles.modalCard,
            alignItems: 'center',
            backgroundColor: 'lightgrey',
            padding: 20,
          }}>
          <Text style={{...styles.secondaryText, marginBottom: 10}}>
            Cambiar avatar
          </Text>
          <FlatList
            data={avatar}
            numColumns={2}
            width="100%"
            renderItem={renderAvatar}
            contentContainerStyle={{alignItems: 'center'}}
            keyExtractor={item => item.name}
          />
          <TouchableOpacity
            style={{
              textAlign: 'center',
              marginTop: 10,
            }}
            onPress={toggleIt}>
            <Text style={styles.loginText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAvatar;
