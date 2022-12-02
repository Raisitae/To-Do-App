import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  FlatList,
  RefreshControl,
  Switch,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
const styles = require('../Styles/Styles');
import elipse from '../Assets/elipse.png';
import Input from '../Components/Input/Input.js';
import texts from '../Local/en';
import axios from 'axios';
import {dataAsync} from '../Services/LocalStorage';
import {useNavigation} from '@react-navigation/native';
import Button from '../Components/Button/Button';
import reactotron from 'reactotron-react-native';
import showMessages from '../Services/ShowMessages';
import HighlightedText from '../Components/Texts/HighlightedText';
import MainTitle from '../Components/Titles/MainTitle';

const NewTask = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const [newTask, setNewTask] = useState('');

  const handleTask = text => {
    setNewTask(text);
  };

  const handleSwitch = () => {
    setIsCompleted(!isCompleted);
  };

  const baseUrl = 'https://ozkavosh-todo.up.railway.app';

  const navigation = useNavigation();

  const where = () => {
    navigation.navigate('UserHome');
  };

  //funciona pero hay que dividirla en modulos
  const createTask = async () => {
    if (newTask == '') {
      reactotron.log(newTask);
      showMessages('Please fill the field', 'red');
    } else {
      const token = await dataAsync();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios
        .post(
          `${baseUrl}/task`,
          {
            description: newTask,
            completed: isCompleted,
          },
          config,
        )
        .then(response => {
          navigation.navigate('UserHome');
          showMessages(texts.message.taskCreated, '#31bfb5');

          return response;
        })
        .catch(error => {
          console.log(error.response);
        });
      return response;
    }
  };

  return (
    <SafeAreaView style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={elipse} />
      <View
        style={{
          ...styles.mainOnboarding,
        }}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <MainTitle label={texts.tasks.mainTitle} />
          <Image
            style={{...styles.imgTitle, marginBottom: 40}}
            source={require('../Assets/newtask.png')}
          />
          <Input input={texts.tasks.createName} function={handleTask} />
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <HighlightedText label={'Completed'} />
            <Switch onValueChange={handleSwitch} value={isCompleted} />
          </View>
        </View>
        <View style={{...styles.inputGroup}}>
          <View style={{...styles.inputGroup, marginBottom: 10}}>
            <Button
              label={texts.tasks.createBtn}
              style={styles.button}
              onPress={createTask}
            />
          </View>
          <View style={{...styles.inputGroup}}>
            <Button label={'Return'} style={styles.button} onPress={where} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewTask;
