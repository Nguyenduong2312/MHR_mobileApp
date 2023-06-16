import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Alert} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Modal,
  Text,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
//import { getFormatedDate } from 'react-native-modern-datepicker';
//import DatePicker from 'react-native-modern-datepicker';
import SyncStorage from 'sync-storage';

export default LoginScreen = (props) => {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { control, handleSubmit } = useForm();
  const [openBirthday, setOpenBirthday] = useState(false);
  const today = new Date();
  //const startDate = getFormatedDate(
    //today.setDate(today.getDate() + 1),
    //'DD-MM-YYYY'
  //);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [startedDate, setStartedDate] = useState('');
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  useEffect(() => {
    fetch('http://192.168.1.30:5000/account/user', {
        credentials: 'include',
        method: 'GET',
        headers: {
            authorization: `Bearer ${SyncStorage.get('token')}`,
        },
    })
        .then((res) => res.json())
        .then((account) => {
            console.log('acc : ', account);
            setUser(account);
        });
    }, []);


  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }
  const handleOnPressStartDate = () => {
    birthday = selectedStartDate;
    console.log(birthday);
    setOpenStartDatePicker(!openStartDatePicker);
  };

  const onRegisterPressed = async (data) => {
    data.birthday = birthday;
    if(!data.birthday){
      alert("Please select your birthday");
      return;
    }
    if(!data.gender){
      alert("Please select your gender");
      return;
    }
    console.log(data);
    fetch('http://192.168.1.30:3000/updateAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status === 'success') {
          console.log('success');
          props.navigation.navigate('Home');
        } else {
          console.log('fail');
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    props.navigation.navigate('Home');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Edit Your Profile</Text>
        <CustomInput
          name="name"
          control={control}
          defaultValue=""
          placeholder="Name"
          placeholderTextColor="#8b9cb5"
           rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 4 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 45 characters long',
            },}}
        />
        <CustomInput
          name="address"
          control={control}
          placeholder="Address"
          placeholderTextColor="#8b9cb5"
          rules={{
            required: 'Address is required',
          }}
        />

        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
        />

        <Controller
          name="birthday"
          control={control}
          defaultValue=""
          render={() => (
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : ''}
              style={{
                width: '100%',
              }}>
              <View>
                <TouchableOpacity
                  style={styles.container}
                  onPress={handleOnPressStartDate}>
                  <Text style={{ color: '#8b9cb5', alignItems: 'center' }}>
                    Birthday{' '}
                  </Text>
                  <Text>{selectedStartDate}</Text>
                </TouchableOpacity>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity onPress={handleOnPressStartDate}>
                      <Text style={{ color: 'white' }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </KeyboardAvoidingView>
          )}
        />
        <View>
          <Controller
            name="gender"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              
                <DropDownPicker
                  style={styles.container}
                  open={genderOpen}
                  value={genderValue}
                  items={gender}
                  setOpen={setGenderOpen}
                  setValue={setGenderValue}
                  setItems={setGender}
                  placeholder="Select Gender"
                  placeholderTextColor='#8b9cb5'
                  placeholderStyle={styles.placeholderStyles}
                  onChangeValue={onChange}
                  zIndex={3000}
                  zIndexInverse={1000}
                />
            
            )}
          />
        </View>
        <CustomButton
          text="Save"
          onPress={
            (() => props.navigation.navigate('UpdateInfo'),
            handleSubmit(onRegisterPressed))
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: -5,
    margin: 10,
    alignItems: 'center',
    borderColor: '#E5E4E2',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 5,
  },

  title: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 30,
    color: '#0039a6',
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#080516',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 0,
  },
});