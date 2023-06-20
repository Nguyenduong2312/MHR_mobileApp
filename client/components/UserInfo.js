import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
export default UserPro = (props) => {
  const id= props.route.params.userid;
  const user={name:"ahihi",address:"fdkjf",email:"hd@",date:"12/12/2016",gender:"male"};
   const viewRecord = () => {
       props.navigation.navigate('User Record',{userid:id});
   };
   const viewRelation=()=>{
     props.navigation.navigate("User Relationship",{userid:id});
   }

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 22,
      }}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Profile of user {id}</Text>
          <View>
            <Text>Name</Text>
            <View style={styles.input}>
              <Text>{user.name} </Text>
            </View>
          </View>
        </View>

        <View style={styles.view}>
          <View>
            <Text>Address</Text>
            <View style={styles.input}>
              <Text>{user.address} </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}>
          <View>
            <Text>Email</Text>
            <View style={styles.input}>
              <Text>{user.email} </Text>
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <View>
            <Text>Birthday</Text>
            <View style={styles.input}>
              <Text>{user.date} </Text>
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <View>
            <Text>Gender</Text>
            <View style={styles.input}>
              <Text>{user.gender} </Text>
            </View>
          </View>
        </View>

        <View style={styles.centeredView}>
         <TouchableOpacity style={styles.container}>
          <Text
            style={styles.text}
            onPress={() => viewRelation()}>
            View user's relationship
          </Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
          <Text
            style={styles.text}
            onPress={() => viewRecord()}>
            View user's healthrecord
          </Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    width: '100%',
    borderColor: 'secondaryGray',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },

  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 30,
    color: '#0039a6',
  },
  container: {
    width: '90%',
    alignItems: 'center',
        justifyContent: 'center',
    padding: 15,
    marginVertical: 5,
    marginTop: 5,
     marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#0039a6",
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  view: {
    flexDirection: 'column',
    marginBottom: 6,
  },
});

