import React, { useEffect, useState } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';
import { Dropdown } from 'react-native-element-dropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUsersInfo, usersContent } from '../redux/state/user';

interface userInfoType {
  name: string;
  surname: string;
  idNumber: number;
  date: Date;
  gender: string;
  email: string;
  password: string;
  rePassword: string;
}
const data = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
];
const SignUp = ({ navigation }: any) => {
  const userInfoArray = [
    'Name',
    'Surname',
    'Id',
    'Birthday',
    'Gender',
    'E-mail*',
    'Password*',
    'Repassword*',
  ];
  const [userInfo, setUserInfo] = useState<userInfoType>({
    name: '',
    surname: '',
    idNumber: 0,
    date: new Date(Date.now()),
    gender: 'male',
    email: '',
    password: '',
    rePassword: '',
  });

  const users = useAppSelector(usersContent);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const onChangeEmail = (e: string) => {
    setUserInfo((prev) => ({ ...prev, email: e }));
  };
  const onChangePassWord = (e: string) => {
    setUserInfo((prev) => ({ ...prev, password: e }));
  };
  const onChangeRepassword = (e: string) => {
    setUserInfo((prev) => ({ ...prev, rePassword: e }));
  };

  const sign = (email: string, password: string) => {
    if (
      users.findIndex((e) => {
        return e.email === email;
      }) !== -1
    ) {
      ToastAndroid.show('Email has a different account', ToastAndroid.SHORT);
    } else {
      dispatch(setUsersInfo({ email, password }));
      navigation.navigate('Login');
    }
  };

  return (
    <View
      className="self-center h-full w-[90%] rounded-md"
      onPointerEnter={() => {
        setOpen(false);
      }}>
      <ScrollView>
        {userInfoArray.map((index, i) => {
          return (
            <View key={i}>
              {index === 'Gender' ? (
                <>
                  <Text className={`text-xs mb-1 mt-1`}>{index}</Text>
                  <Dropdown
                    style={{
                      backgroundColor: 'white',
                      borderWidth: 1,
                      borderRadius: 10,
                      marginBottom: 5,
                    }}
                    placeholderStyle={{ paddingLeft: 10 }}
                    selectedTextStyle={{ paddingLeft: 10 }}
                    data={data}
                    placeholder="Select Gender"
                    labelField={'label'}
                    valueField={'value'}
                    value={value}
                    onChange={() => {}}
                  />
                </>
              ) : index === 'Birthday' ? (
                <View>
                  <Text className={`text-xs mb-1`}>{index}</Text>
                  <Button
                    mode="outlined"
                    className="bg-white"
                    textColor="black"
                    icon={'calendar'}
                    labelStyle={{ fontSize: 20 }}
                    onPress={() => setOpen(true)}>
                    {userInfo.date.toDateString()}
                  </Button>
                  {open === true && (
                    <RNDateTimePicker
                      onChange={(e, date) => {
                        setOpen(false);
                        setUserInfo({ ...userInfo, date: date! });
                      }}
                      mode="date"
                      display="inline"
                      value={userInfo.date}
                    />
                  )}
                </View>
              ) : (
                <Input
                  onChange={
                    index === 'E-mail*'
                      ? onChangeEmail
                      : index === 'Password*'
                      ? onChangePassWord
                      : onChangeRepassword
                  }
                  inputMode={'text'}
                  secure={index === 'Password*' || index === 'Repassword*' ? true : false}
                  inputName={index}
                  height={5}
                />
              )}
            </View>
          );
        })}
        <Text className="text-right mb-1">
          I'm a saved user{' '}
          <Text
            className="underline text-purple-600"
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Login
          </Text>
        </Text>
        <Button
          onPress={() => {
            if (userInfo.email === '' || userInfo.password === '' || userInfo.rePassword === '') {
              ToastAndroid.show(
                'You cannot leave the required fields(*) blank!!',
                ToastAndroid.SHORT
              );
            } else if (userInfo.password !== userInfo.rePassword) {
              ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
            } else {
              sign(userInfo.email, userInfo.password);
            }
          }}
          mode="contained"
          className=" bg-gray-600 w-[20vh] self-center">
          Sign Up
        </Button>
      </ScrollView>
    </View>
  );
};

export default SignUp;
