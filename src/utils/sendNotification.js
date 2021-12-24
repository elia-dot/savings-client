import axios from 'axios';
export const sendPushNotification = async (data) => {
  const { userId, title, body } = data;
  const message = {
    to: userId,
    title,
    body,
  };
  try {
    await axios.post('https://goals-65106.herokuapp.com/message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      message,
    });
  } catch (error) {
    console.log('push', error.response.data);
  }
};
