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
        <View style={styles.modalCard}>
          <Text>Editar tarea</Text>
          <TouchableOpacity
            style={{backgroundColor: 'lightblue'}}
            onPress={toggleIt}>
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
