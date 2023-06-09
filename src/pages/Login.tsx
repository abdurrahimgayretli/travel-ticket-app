import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';

interface userInfoType {
  email: string;
  password: string;
}

const Login = ({ navigation }: any) => {
  const userInfoArray = ['E-mail', 'Password'];
  const [userInfo, setUserInfo] = useState<userInfoType>({
    email: '',
    password: '',
  });
  return (
    <View className="self-center w-[90%] rounded-md p-[1vh]">
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
          I'm a new user{' '}
          <Text
            className="underline text-purple-600"
            onPress={() => {
              navigation.navigate('Sign Up');
            }}>
            Sign Up
          </Text>
        </Text>
        <Button
          mode="contained"
          className=" bg-gray-600 w-[20vh] self-center"
          onPress={() => {
            navigation.navigate('Search Ticket');
          }}>
          Login
        </Button>
      </ScrollView>
    </View>
  );
};

export default Login;
