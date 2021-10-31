import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

export const getAllGoals = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/goals/users/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createGoal = async (data) => {
  const res = await axios.post(`${baseUrl}/goals`, data, config);
  return res;
};

export const deleteGoal = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/goals/${id}`)
    return res
  } catch (error) {
    console.log(error.response.data);
  }
}
