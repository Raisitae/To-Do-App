import react, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Switch,
} from 'react-native';
import {Button} from '../Button/Button';
import reactotron from 'reactotron-react-native';
const styles = require('../../Styles/Styles');
import Input from '../Input/Input';
import {updateTask} from '../../Services/Api';
import {AuthContext, user} from '../../Services/Context';

const ModalComponent = ({toggleModal}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const {user} = useContext(AuthContext);
  const [input, setInput] = useState('');

  const handleInput = text => {
    setInput(text);
  };

  const toggleIt = () => {
    setIsOpen(false);
    toggleModal();
  };

  const handleSwitch = () => {
    setIsCompleted(!isCompleted);
  };

  editTaskHandler = () => {
    if (input === '') {
      updateTask(user.token, data, isCompleted, title);
    } else {
      updateTask(user.token, data, isCompleted, input);
    }
    toggleIt();
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
          }}>
          <Text style={{...styles.secondaryText, marginBottom: 10}}>
            Editar tarea
          </Text>
          <Input input={title} function={handleInput} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.loginText}>Completed</Text>
            <Switch onValueChange={handleSwitch} value={completed} />
          </View>
          <TouchableOpacity
            style={{...styles.secondaryText, marginBottom: 10}}
            onPress={editTaskHandler}>
            <Text style={styles.loginText}>Editar tarea</Text>
          </TouchableOpacity>
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

export default ModalComponent;
