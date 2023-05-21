import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "./Header";

import {useForm, Controller} from 'react-hook-form';

const Sign = (props) => {
  const [roleOpen, setRoleOpen] = useState(false);
  const [roleValue, setRoleValue] = useState(null);
  const [role, setRole] = useState([
    { label: "Doctor", value: "doctor" },
    { label: "Patient", value: "patient" },
    { label: "Health Organization", value: "healthorganization"}
  ]);
  const [loading, setLoading] = useState(false);
  const onRoleOpen = useCallback(() => {
    setRoleOpen(false);
  }, []);


  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data, "data");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>User Name</Text>
      <Controller
        name="user name"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text style={styles.label}>Password</Text>
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            selectionColor={"#5188E3"}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <View>
        
      </View>


      <Text style={styles.label}>Role</Text>
      <Controller
        name="role"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownRole}>
            <DropDownPicker
              style={styles.dropdown}
              open={roleOpen}
              value={roleValue} erValue
              items={role}
              setOpen={setRoleOpen}
              setValue={setRoleValue}
              setItems={setRole}
              placeholder="Select Your Role"
              placeholderStyle={styles.placeholderStyles}
              onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
        )}
      />
   
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.getStarted}>Get Started</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.logIn}>
        <Text style={styles.links} onPress={()=>props.navigation.navigate('Login')}>I have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A7C7E7",
  },
  input: {
    borderStyle: "solid",
    borderColor: "#0039a6",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 25,
    backgroundColor: "#ffffff",
  },
  label: {
    marginBottom: 7,
    marginStart: 10,
    fontSize:15,

  },
  placeholderStyles: {
    color: "grey",
  },

  dropdownRole: {
    marginHorizontal: 10,
    marginBottom: 25,
  },
  dropdown: {
    borderColor:"#0039a6",
    height: 50,
  },
  getStarted: {
    backgroundColor: "#0039a6",
    color: "white",
    textAlign: "center",
    marginHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  logIn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#758580",
  },
});

export default Sign;
