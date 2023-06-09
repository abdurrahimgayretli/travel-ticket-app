import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';

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

const SignUp = ({ navigation }: any) => {
  const userInfoArray = [
    'Name',
    'Surname',
    'Id number',
    'Birthday',
    'Gender',
    'E-mail',
    'Password',
    'Repassword',
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
  return (
    <View className="self-center h-full w-[90%] rounded-md p-[1vh]">
      <ScrollView>
        {userInfoArray.map((index, i) => {
          return (
            <View key={i}>
              <Text className="text-xs">{index}</Text>
              <Input inputName={index} height={4} />
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
        <Button mode="contained" className=" bg-gray-600 w-[20vh] self-center">
          Sign Up
        </Button>
      </ScrollView>
    </View>
  );
};

export default SignUp;
