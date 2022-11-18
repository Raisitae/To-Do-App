import React, {useState, createContext} from 'react';
import reactotron from 'reactotron-react-native';
import {setTokenAuthentication} from '../Services/Api';
import {storeData} from '../Services/LocalStorage';
import t from '../Services/Translate';

const auth = {
  user: undefined,
  isLoggedIn: false,
  token: '',
};

export const AuthContext = React.createContext(auth);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(auth);

  const login = ({user, token}) => {
    setUser({
      user,
      isLoggedIn: true,
      token,
    });
    reactotron.log('token', token);
    setTokenAuthentication(token);
    storeData(token);
  };

  const logout = () => {
    setUser(auth);
    storeData('token', '');
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
