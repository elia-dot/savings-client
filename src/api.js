import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://goals-65106.herokuapp.com';

export const login = async (data) => {
  const config = {
    'Content-Type': 'application/json',
  };
  try {
    const res = await axios.post(`${baseUrl}/users/login`, data, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      console.log(error);
    }
  }
};

export const logOut = async() => {
  try {
    await AsyncStorage.removeItem('token')
  } catch (error) {
    console.log(error);
  }
}
