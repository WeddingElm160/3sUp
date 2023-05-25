import React from 'react'
import { createContext, useEffect, useState } from "react";
import { User } from '../Class/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_User')
      return jsonValue != null ? await JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.warn(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_User', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
    console.log('Done.')
  }

  useEffect(() => {
    getData().then((user)=>{
      if (!user) {
        user = new User();
        storeData(user);
      }
      setUser(user);
      props.userReady();
    })
  }, []);

  return (
    <UserContext.Provider value={{user}}>
      {props.children}
    </UserContext.Provider>
  )
}
