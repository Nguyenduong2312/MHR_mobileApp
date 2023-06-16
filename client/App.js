import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Login from "./components/Login";
import Profile from "./components/FillProfile";

import Register from './components/Register'
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function UpdateInfoDrawer({ navigation }) {
  return (
    <Profile/>
  );
}

function FamilyDrawer() {
  return (
    <Family/>
  );
}
function CustomDrawer (name){
  return (
   <name/>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
         <DrawerItem
        label="Close drawer"
         onPress={()=>props.navigation.navigate('Register')}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Edit Profile" component={UpdateInfoDrawer} />

    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
      name="Edit Profile"
      component={MyDrawer}
      options={{ headerShown: false }}
    />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}