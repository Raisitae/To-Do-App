import react, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {Button} from '../Button/Button';
import reactotron from 'reactotron-react-native';
const styles = require('../../Styles/Styles');

const ModalComponent = ({toggleModal}) => {
  const [isOpen, setIsOpen] = useState(false);

  reactotron.log(data);

  const toggleIt = () => {
    setIsOpen(false);
    toggleModal();
  };

  const deleteConfirm = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Sí',
          onPress: () => handleSignOut(),
          style: 'cancel',
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      },
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
      <View>
        <View>
          <Text style={{...styles.secondaryText, color: 'black'}}>
            Editar tarea
          </Text>
          <TouchableOpacity onPress={toggleIt}>
            <Text style={{...styles.secondaryText, color: 'black'}}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
