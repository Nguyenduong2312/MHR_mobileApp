import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StyleSheet,
  View,
  TextInput,
  Text,

} from 'react-native';
import CustomButton from './CustomButton';

export default LoginScreen = (props) => {
  const { control, handleSubmit } = useForm();
  const [user, setUser] = useState({});

  const [id, setID] = useState('');
  const [relationOpen, setRelationOpen] = useState(false);
  const [roleRelationShip, setRelationValue] = useState(user.gender);
  const [relation, setRelation] = useState([
    { label: 'Father', value: 'father' },
    { label: 'Mother', value: 'mother' },
    { label: 'Daughter', value: 'daughter' },
   { label: 'Son', value: 'son' },
  ]);


  const onRegisterPressed = async (e) => {
    const data={id,roleRelationShip}
    console.log(data)
    /*let date = selectedStartDate;
    let gender = genderValue;
    const formData = { name, address, email, date, gender };
    console.log(formData)
    if (!formData.name) {
      alert('Please enter your name');
      return;
    }
    if (!formData.address) {
      alert('Please enter your address');
      return;
    }


    e.preventDefault();
    try {
      const res = await axios.put(`/myProfile/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }*/
  };

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 22,
      }}>

        <View>
          <Text style={styles.title}>Add Family Member</Text>
          <View>
    
            <View style={styles.input}>
              <TextInput
                placeholder="Enter your family member's ID"
                placeholderTextColor="#808080"
                onChangeText={(value) => setID(value)}
                editable={true}
              />
            </View>
          </View>
        </View>

      
   
        <View>
         
          <Controller
          
            name="relation"
            defaultValue=""
            control={control}
            render={({ field: { onChange} }) => (
              <DropDownPicker
              style={styles.input}
                open={relationOpen}
                value={roleRelationShip}
                items={relation}
                setOpen={setRelationOpen}
                setValue={setRelationValue}
                setItems={setRelation}
                placeholder="Choose relationship"
                placeholderStyle={styles.placeholderStyles}
                onChangeValue={onChange}
                zIndex={3000}
                zIndexInverse={1000}
              />
            )}
          />
        </View>
    <View style={styles.button}>
      <CustomButton 
          text="Send Request"
          onPress={
            (() => props.navigation.navigate('UpdateInfo'),
            handleSubmit(onRegisterPressed))
          }
        />
        </View>  
    </SafeAreaProvider>
    
  );
};

const styles = StyleSheet.create({

button:{
 flex: 1,
 marginBottom:20,
        backgroundColor: 'white',
        paddingHorizontal: 22,
        allignitems: 'center',
        paddingLeft: 40,
},
  input: {
    height: 44,
    width: '100%',
    borderColor: 'secondaryGray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom:20,

    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
  },

placeholderStyles:{
     
    color:"#808080",
},
  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 30,
    color: '#0039a6',
  },


});
