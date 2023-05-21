import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";


import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
export default function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  senData = () => {
    console.log(username,password);
    fetch('http://192.168.1.37:5000/login',{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "username":username,
       "password":password
     })
    })
    .then(()=> {
      props.navigation.navigate('Register')})
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>WELCOME BACK!</Text> 
      <Image style={styles.image} source={require("./images/a.png")} /> 
      <StatusBar style="auto" />
  
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Type your username"
          placeholderTextColor=	"#787878"
          onChangeText={(username) => setUsername(username)}
          
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Type your password"
          placeholderTextColor=	"#787878"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity>  
     
      <TouchableOpacity style={styles.loginBtn}>
      <Button
        style={styles.loginText}
        onPress={() => senData()}
        title="Login"
      >
        Login
      </Button>
      </TouchableOpacity> 

      <Text style={styles.notHave}>Don't have an account?</Text> 
      <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
        <Text style={styles.orsignup}>Create now</Text> 
      </TouchableOpacity> 
        
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A7C7E7",
    alignItems: "center",
    justifyContent: "center",
    
  },

  image: {
    marginBottom: -10,
    width: 350,
    height: 200,
    resizeMode: 'stretch',
  },
  inputView: {
    backgroundColor:"#ffffff",
    borderColor:"#6050DC",
    width: "85%",
    height: 50,
    marginTop:10,
    marginBottom: 10,
   
    
  },
  TextInput: {
    height: 50,
    color: '#6050DC',
    fontSize:15,
    justifyContent: "center",
    marginLeft:27,
   
  },
  welcome:{
    marginTop:0,
    fontSize: 30,
    color:"#0039a6"
  },
  forgot_button: {
    height: 30,
    marginTop:10,
    marginBottom: 20,
    fontStyle: 'italic',
    fontSize: 15,
    color: "#0039a6",
  
  },
  loginBtn: {
    width: "45%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,  
    borderRadius: 30,
    backgroundColor: "#0039a6",
  },
  notHave:{
    color: "#0039a6",
    marginTop:30,
    fontSize:15,
    
  },
  loginText:{
    color:"#ffffff",
    fontWeight: 'bold',
    fontSize:25,
  },
  orsignup:{
    color: 'red',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize:18,
  },
});