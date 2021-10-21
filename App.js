import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Goals from './src/screens/Goals';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const HomeTabs = () => {
  <Tab.Navigator
  // screenOptions={({route}) => ({
  //   tabBarIcon: ({focused, size, color}) => {
  //     let iconName;
  //     if (route.name === 'Goals') {
  //       iconName = 'bullseye';
  //       size = focused ? 25 : 20;
  //     } else if (route.name === 'Done') {
  //       iconName = 'clipboard-check';
  //       size = focused ? 25 : 20;
  //     }
  //     return <FontAwesome5 name={iconName} size={size} color={color} />;
  //   },
  // })}
  >
    <Tab.Screen
    name = "Goals"
    component = {Goals}
    />
  </Tab.Navigator>
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: ()=> null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
