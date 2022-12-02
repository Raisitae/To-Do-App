import React, {useState, createContext} from 'react';
import reactotron from 'reactotron-react-native';
import {setTokenAuthentication} from '../Services/Api';
import {
  storeData,
  storeDataUser,
  storeDataAvatar,
} from '../Services/LocalStorage';
import t from '../Services/Translate';
import {setUserVar} from '../Services/Api';

const auth = {
  user: undefined,
  isLoggedIn: false,
  token: '',
};

export const AuthContext = React.createContext(auth);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(auth);
  const [image, setImage] = useState(null);

  const login = ({user, token}) => {
    setUser({
      user,
      isLoggedIn: true,
      token,
    });
    reactotron.log('token', token);
    setTokenAuthentication(token);
    setUserVar(user);
    storeDataUser(user);
    storeData(token);
  };

  const logout = () => {
    setUser(auth);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
