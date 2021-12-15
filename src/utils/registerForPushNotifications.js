import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import axios from 'axios';

const PUSH_ENDPOINT = 'https://goals-65106.herokuapp.com/token';

const registerForPushNotifications = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    try {
      const res = await axios.post(PUSH_ENDPOINT, { token });
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};
export default registerForPushNotifications;
