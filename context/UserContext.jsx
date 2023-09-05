import React from 'react'
import { createContext, useEffect, useState } from "react";
import { User } from '../Class/User';
import { userEmail } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from 'react-native-reanimated';

export const UserContext = createContext();


export function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_User')
      return jsonValue != null ? new User(await JSON.parse(jsonValue), userEmail) : new User(null, userEmail);
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
    //clearAll();
    getData().then((user)=>{
      if (!user) {
        user = new User();
        storeData(user);
      }
      console.log(user, user.carts.length);
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
