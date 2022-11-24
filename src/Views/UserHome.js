import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import elipse from '../Assets/elipse.png';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
const styles = require('../Styles/Styles');
import reactotron from 'reactotron-react-native';
import {useNavigation} from '@react-navigation/native';
import {dataAsync} from '../Services/LocalStorage';
import {userLogout, getAvatar} from '../Services/Api';
import showMessages from '../Services/ShowMessages';
import {getTasks} from '../Services/Api';
import {AuthContext, user} from '../Services/Context';
import {deleteTask} from '../Services/Api';
import ModalComponent from '../Components/Modal/ModalComponent';
import UserProfileHeader from '../Components/UserProfileHeader/UserProfileHeader';

const UserHome = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [task, setTask] = useState('');
  const {user, logout} = useContext(AuthContext);
  const [name, setName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(!modalVisible);
  };

  const getAllTasks = async () => {
    setLoading(true);
    // si saco el token de localstorage tarda un poco y cuando entro no hay nada
    //const token = await dataAsync();
    //si lo saco del context no hay problema
    const response = await getTasks(user.token);
    setTask(response.data.data);
    setLoading(false);
    return response.data.data;
  };

  const deleteTasks = async data => {
    setLoading(true);
    const token = await dataAsync();
    deleteTask(data, token);
    getAllTasks();
    setLoading(false);
  };

  const deleteConfirm = data => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Yes',
          onPress: () => deleteTasks(data),
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

  const renderItem = ({item}) => {
    return (
      <View
        style={{...styles.inputGroup, marginBottom: 20, alignSelf: 'center'}}>
        <Button
          label={item.description}
          onPress={() => {
            data = item._id;
            deleteConfirm(data);
            /*setModalVisible(true)*/
          }}
        />
      </View>
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    getAllTasks();
    setLoading(false);
  }, [refreshing]);

  const onPressOut = async () => {
    await dataAsync().then(token => {
      userLogout(token)
        .then(response => {
          showMessages('Sesion cerrada', '#31bfb5');
          navigation.navigate('Welcome');
          logout({user: null});
          return response;
        })
        .catch(error => {
          console.log(error.response);
        });
    });
  };

  return (
    <SafeAreaView style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={elipse} />
      <UserProfileHeader />
      <View
        style={{
          ...styles.mainOnboarding,
          height: '60%',
          paddingTop: 20,
          paddingBottom: 40,
          justifyContent: 'space-around',
          alignContent: 'center',
        }}>
        {loading ? (
          <View style={{...styles.inputGroup, height: '67.9%', width: '100%'}}>
            <MainTitle label="Cargando..." />
          </View>
        ) : task ? (
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
      {modalVisible && (
        <ModalComponent data={data} toggleModal={handleOpenModal} />
      )}
    </SafeAreaView>
  );
};

export default UserHome;
