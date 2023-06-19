import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Login from './components/Login';
import Profile from './components/Fill';
import Record from './components/MyRecord';
import Register from './components/Register';
//import Pending from './components/PedingRequests';
//import Family from './components/Family';
import Home from './components/Home';
//import Received from './components/ReceivedRecord';
//import Sent from './components/SentRequests';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Edit Profile" component={Profile} />
      <Drawer.Screen name="My Record" component={Record} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
         <Stack.Screen
        
          name="Edit Profile"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="My Record"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Received Records"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sent Requests"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pending Requests"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}