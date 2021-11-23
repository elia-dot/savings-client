// import axios from 'axios';

// const baseUrl = 'https://goals-65106.herokuapp.com';

// const config = {
//   'Content-Type': 'application/json',
// };

// export const getAllGoals = async (id) => {
//   try {
//     const res = await axios.get(`${baseUrl}/goals/users/${id}`);
//     return res.data.data;
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// export const createGoal = async (data) => {
//   const res = await axios.post(`${baseUrl}/goals`, data, config);
//   return res;
// };

// export const deleteGoal = async (id) => {
//   try {
//     const res = await axios.delete(`${baseUrl}/goals/${id}`);
//     return res;
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// export const update = async ({ data, id }) => {
//   try {
//     const res = await axios.patch(`${baseUrl}/goals/${id}`, data);
//     return res;
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// export const getAllSavings = async (id) => {
//   try {
//     const res = await axios.get(`${baseUrl}/savings/users/${id}`);
//     return res.data.data;
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// export const createSaving = async (data) => {
//   const res = await axios.post(`${baseUrl}/savings`, data, config);
//   return res;
// };

// export const deleteSaving = async (id) => {
//   try {
//     const res = await axios.delete(`${baseUrl}/savings/${id}`);
//     return res;
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };

// export const updateCurrency = async ({ id, currency }) => {
//   try {
//     const res = await axios.patch(`${baseUrl}/users/${id}`, currency, config);
//     return res;
//   } catch (error) {
//     console.log(error.response.data);
//   }
// };
