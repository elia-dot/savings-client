import axios from "axios";
import { GET_HISTORY } from "./types";

const baseUrl = 'https://goals-65106.herokuapp.com';

const config = {
  'Content-Type': 'application/json',
};

export const getHistory = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`${baseUrl}/savings/users/${userId}`)
        console.log(res.data.data);
        dispatch({
            type: GET_HISTORY,
            payload: res.data.data
        }) 
    } catch (error) {
        console.log(error);
    }
}