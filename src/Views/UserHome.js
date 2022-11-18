import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
} from 'react-native';
import elipse from '../Assets/elipse.png';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
const styles = require('../Styles/Styles');
import reactotron from 'reactotron-react-native';
import {useNavigation} from '@react-navigation/native';
import {dataAsync} from '../Services/LocalStorage';
import {userLogout} from '../Services/Api';
import showMessages from '../Services/ShowMessages';
import {getTasks} from '../Services/Api';

const UserHome = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [task, setTask] = useState('');

  const getAllTasks = async () => {
    setLoading(true);
    const token = await dataAsync();
    const response = await getTasks(token);
    setTask(response.data.data);
    setLoading(false);
    return response.data.data;
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={{...styles.inputGroup, marginBottom: 20, alignSelf: 'center'}}>
        <Button label={item.description} />
      </View>
    );
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const onPressOut = async () => {
    setLoading(true);
    await dataAsync().then(token => {
      userLogout(token)
        .then(response => {
          showMessages('Sesion cerrada', '#31bfb5');
          navigation.navigate('Login');
          return response;
        })
        .catch(error => {
          console.log(error.response);
        });
    });
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={elipse} />
      <View
        style={{
          ...styles.mainOnboarding,
          paddingBottom: 40,
          justifyContent: 'space-around',
          alignContent: 'center',
        }}>
        {task ? (
          <FlatList
            data={task}
            style={{height: '50%', width: '100%'}}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getAllTasks} />
            }
          />
        ) : (
          <View style={{...styles.inputGroup, height: '67.9%', width: '100%'}}>
            <MainTitle label="No hay tareas creadas" />
          </View>
        )}
        <View style={styles.inputGroup}>
          <View style={{...styles.inputGroup, marginBottom: 20}}>
            <Button
              label={'Create new task'}
              onPress={() => {
                navigation.navigate('NewTask');
              }}
            />
          </View>
          <View style={styles.inputGroup}>
            <Button label={'Log out'} onPress={onPressOut} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserHome;
