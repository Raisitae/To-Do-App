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
import {postAvatar} from '../../Services/Api';
import {FlatList} from 'react-native-gesture-handler';
import avatarList from '../../Services/Avatar';
import reactotron from 'reactotron-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {storeAvatar, getAvatar} from '../../Services/LocalStorage';

const ModalAvatar = ({toggleModal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatars, setAvatars] = useState('');
  const [imageCamera, setImageCamera] = useState(null);

  console.log(data.token);
  useEffect(() => {
    setAvatars(avatarList);
  }, []);

  const toggleIt = () => {
    setIsOpen(false);
    toggleModal();
  };

  const handleAvatar = item => {
    storeAvatar(item);
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

  const renderAvatar = ({item}) => {
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
      animationType="fade"
      transparent={true}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      statusBarTranslucent
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modalContainer}>
        <View
          style={{
            ...styles.modalCard,
            alignItems: 'center',
            backgroundColor: '#EDEDEE',
            padding: 40,
            paddingTop: 60,
            paddingBottom: 60,
          }}>
          <Text style={{...styles.textTitle, fontSize: 18, marginBottom: 10}}>
            Change avatar
          </Text>
          <FlatList
            data={avatars}
            numColumns={2}
            width="100%"
            renderItem={renderAvatar}
            contentContainerStyle={{alignItems: 'center'}}
            keyExtractor={item => item.name}
          />
          <Text
            style={{
              ...styles.textTitle,
              fontSize: 18,
              marginTop: 20,
              marginBottom: 10,
            }}>
            Upload a photo
          </Text>
          {imageCamera && (
            <TouchableOpacity onPress={() => handleAvatar(imageCamera)}>
              <Image
                source={{uri: imageCamera}}
                style={{height: 100, width: 100, borderRadius: 100}}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              ...styles.button,
              textAlign: 'center',
              borderRadius: 50,
              height: 60,
              width: 60,
              margin: 10,
              marginBottom: 20,
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
