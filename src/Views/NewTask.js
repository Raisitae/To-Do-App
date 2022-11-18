import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
const styles = require('../Styles/Styles');
import elipse from '../Assets/elipse.png';
import Input from '../Components/Input/Input.js';
import Button from '../Components/Button/Button';
import texts from '../Local/en';
import axios from 'axios';
import {dataAsync} from '../Services/LocalStorage';
import {useNavigation} from '@react-navigation/native';
import {getTasks} from '../Services/Api';
import reactotron from 'reactotron-react-native';

const NewTask = () => {
  const [task, setTask] = useState('');

  const handleTask = text => {
    setTask(text);
  };

  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';

  const navigation = useNavigation();

  //funciona pero hay que dividirla en modulos
  const createTask = async () => {
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
          description: task,
        },
        config,
      )
      .then(response => {
        navigation.navigate('UserHome');
        return response;
      })
      .catch(error => {
        console.log(error.response);
      });
    return response;
  };

  const getAllTasks = async () => {
    const token = await dataAsync();
    const response = await getTasks(token);
    setTask(response.data);
    reactotron.log('task', task);
    return response;
  };

  const renderTask = ({item}) => {
    return <Text>{item.description}</Text>;
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View
        style={{
          ...styles.mainOnboarding,
          paddingBottom: 20,
          justifyContent: 'center',
        }}>
        <View style={styles.center}>
          {task ? (
            <FlatList
              data={task}
              style={{height: 30, backgroundColor: 'red'}}
              renderTask={renderTask}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>no hay tareas</Text>
          )}
        </View>
        <Input input={texts.tasks.createName} function={handleTask} />
        <Button label={texts.tasks.createBtn} onPress={createTask} />
      </View>
      <Image style={styles.elipse} source={elipse} />
    </KeyboardAvoidingView>
  );
};

export default NewTask;
