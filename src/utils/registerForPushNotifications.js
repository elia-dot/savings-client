import * as Notifications from 'expo-notifications';

const PUSH_ENDPOINT = 'https://goals-65106.herokuapp.com/token';

const registerForPushNotifications = async () => {
  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      }
    }),
  });
}
export default registerForPushNotifications;