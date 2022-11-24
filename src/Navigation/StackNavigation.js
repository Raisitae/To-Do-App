import React, {useState, useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from '../Views/Welcome';
import Login from '../Views/Login';
import Register from '../Views/Register';
import UserHome from '../Views/UserHome';
import NewTask from '../Views/NewTask';
import {dataAsync} from '../Services/LocalStorage';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../Services/Context';
import reactotron from 'reactotron-react-native';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  const [loading, setLoading] = useState(true);
  const {user, login} = useContext(AuthContext);
  reactotron.log(user.isLoggedIn);
  useEffect(() => {
    dataAsync().then(res => {
      if (!res) {
        setLoading(false);
        return;
      }
      login({
        token: res,
      });
      setLoading(false);
    });
  }, []);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <NavigationContainer independent={true}>
      {user?.isLoggedIn ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          inicialRouteName="UserHome">
          <Stack.Screen name="UserHome" component={UserHome} />
          <Stack.Screen name="NewTask" component={NewTask} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          inicialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export {MainStackNavigator};
