import react, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, Modal, Alert, Switch} from 'react-native';
import {Button} from '../Button/Button';
import reactotron from 'reactotron-react-native';
const styles = require('../../Styles/Styles');
import Input from '../Input/Input';
import {updateTask} from '../../Services/Api';
import {AuthContext, user} from '../../Services/Context';
import {Dimensions} from 'react-native';

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

  const screenHeight = Dimensions.get('window').height;

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
            height: screenHeight * 0.6,
            alignItems: 'center',
            backgroundColor: '#EDEDEE',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{...styles.textTitle, fontSize: 18, marginBottom: 10}}>
            Editar tarea
          </Text>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Input input={title} function={handleInput} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  ...styles.mainTitle,
                  fontSize: 15,
                }}>
                Completed
              </Text>
              <Switch onValueChange={handleSwitch} value={isCompleted} />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                ...styles.button,
                textAlign: 'center',
                height: 40,
                marginBottom: 10,
              }}
              onPress={editTaskHandler}>
              <Text style={{...styles.buttonLabel, fontSize: 15}}>
                Editar tarea
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,
                textAlign: 'center',
                height: 40,
              }}
              onPress={toggleIt}>
              <Text style={{...styles.buttonLabel, fontSize: 15}}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
