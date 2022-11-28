import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  StatusBar,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
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
import {AuthContext, user} from '../Services/Context';
import {deleteTask} from '../Services/Api';
import ModalComponent from '../Components/Modal/ModalComponent';
import UserProfileHeader from '../Components/UserProfileHeader/UserProfileHeader';
import {Dimensions} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserHome = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [task, setTask] = useState('');
  const {user, logout} = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  let screenHeight = Dimensions.get('window').height;

  const handleOpenModal = () => {
    setModalVisible(!modalVisible);
    setTimeout(() => {
      getAllTasks();
    }, 300);
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
          onPress: () => {
            setLoading(true), setLoading(false);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const renderItem = ({item}) => {
    const color = item.completed ? 'lightgreen' : 'pink';
    const leftSwipe = (progress, dragX) => {
      //animation to come and go
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
      return (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 60,
            borderBottomEndRadius: 20,
            borderTopEndRadius: 20,
          }}
          onPress={() => {
            const data = item._id;
            deleteConfirm(data);
          }}>
          <View style={{paddingLeft: 50}}>
            <Ionicons name="trash" size={40} color="#CB0000" />
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <Swipeable renderLeftActions={leftSwipe}>
        <View
          style={{...styles.inputGroup, marginBottom: 20, alignSelf: 'center'}}>
          <Button
            label={item.description}
            style={{...styles.button, backgroundColor: color}}
            onPress={() => {
              data = item._id;
              completed = item.completed;
              title = item.description;
              setModalVisible(true);
            }}
          />
        </View>
      </Swipeable>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllTasks();
      setLoading(false);
    });
    return unsubscribe;
  }, [loading]);

  const onPressOut = async () => {
    await dataAsync().then(token => {
      userLogout(token)
        .then(response => {
          showMessages('Sesion cerrada', '#31bfb5');
          logout({user: null});
          navigation.navigate('Welcome');
          return response;
        })
        .catch(error => {
          console.log(error.response);
        });
    });
  };

  return (
    <SafeAreaView style={{height: screenHeight}}>
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
          paddingTop: 20,
          paddingBottom: 40,
          justifyContent: 'space-around',
          alignContent: 'center',
        }}>
        {loading ? (
          <View
            style={{
              ...styles.inputGroup,
              height: '68%',
            }}>
            <ActivityIndicator size="large" color="#31bfb5" />
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
          <View style={{...styles.inputGroup, height: '68%'}}>
            <MainTitle label="No hay tareas creadas" />
          </View>
        )}
        <View style={{...styles.inputGroup, paddingTop: 20, paddingBottom: 30}}>
          <View style={{...styles.inputGroup, marginBottom: 10}}>
            <Button
              label={'Create new task'}
              onPress={() => {
                navigation.navigate('NewTask');
              }}
              style={{...styles.button}}
            />
          </View>
          <View style={styles.inputGroup}>
            <Button
              label={'Log out'}
              onPress={onPressOut}
              style={{...styles.button}}
            />
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
