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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ModalAvatar = ({toggleModal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [imageCamera, setImageCamera] = useState(null);

  console.log(data.token);
  useEffect(() => {
    setAvatar(avatarList);
  }, []);

  const toggleIt = () => {
    setIsOpen(false);
    toggleModal();
  };

  const handleAvatar = item => {
    updateAvatar(item, data.token);
    toggleIt();
  };

  const handleCamera = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    const result = await launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        console.log(response.uri);
        setImageCamera(response.assets[0].uri);
      }
      console.log('result', result);
    });
  };

  console.log('imagen', imageCamera);

  const renderAvatar = ({item}) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{padding: 10}}
        key={item.id}
        onPress={() => handleAvatar(item.url)}>
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
          {imageCamera && (
            <View>
              <Image
                source={{uri: imageCamera}}
                style={{height: 100, width: 100, borderRadius: 100}}
              />
            </View>
          )}
          <TouchableOpacity
            style={{
              ...styles.button,
              textAlign: 'center',
              borderRadius: 50,
              height: 60,
              width: 60,
              margin: 10,
            }}
            onPress={handleCamera}>
            <Ionicons name="camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              textAlign: 'center',
              height: 40,
            }}
            onPress={toggleIt}>
            <Text style={{...styles.buttonLabel, padding: 2}}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAvatar;
