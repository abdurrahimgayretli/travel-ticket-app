import React, { useEffect, useState } from 'react';
import { View, ScrollView, ToastAndroid } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Input from '../components/Input';
import { useAppSelector } from '../redux/hooks';
import { usersContent } from '../redux/state/user';

interface userInfoType {
  email: string;
  password: string;
}

const Login = ({ navigation, route }: any) => {
  const users = useAppSelector(usersContent);

  const [check, setCheck] = useState(false);
  const userInfoArray = ['E-mail', 'Password'];
  const [userInfo, setUserInfo] = useState<userInfoType>({
    email: '',
    password: '',
  });
  const onChangeEmail = (e: string) => {
    setUserInfo((prev) => ({ ...prev, email: e }));
  };
  const onChangePassWord = (e: string) => {
    setUserInfo((prev) => ({ ...prev, password: e }));
  };

  const logFunc = (email: string, password: string) => {
    if (
      users.findIndex((e) => {
        return e.email === email && e.password === password;
      }) !== -1
    ) {
      navigation.navigate('Search Ticket');
    } else {
      setCheck(true);
      ToastAndroid.show(
        'The user for the information you entered could not be found.',
        ToastAndroid.SHORT
      );
    }
  };

  useEffect(() => {
    if (userInfo.email.length + userInfo.password.length > 0) {
      setCheck(false);
    }
  }, [userInfo]);

  return (
    <View className="self-center w-[90%] rounded-md p-[1vh] top-[5%]">
      <ScrollView>
        <Input
          borderColor={check}
          onChange={onChangeEmail}
          inputName={userInfoArray[0]}
          height={5}
        />
        <Input
          borderColor={check}
          secure={true}
          onChange={onChangePassWord}
          inputName={userInfoArray[1]}
          height={5}
        />
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
          onPress={() => logFunc(userInfo.email, userInfo.password)}>
          Login
        </Button>
      </ScrollView>
    </View>
  );
};

export default Login;
