import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const LoadingPage = ({ navigation }: any) => {
  const [close, setClose] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!close) {
        navigation.navigate('Search Ticket')
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [close]);

  return (
    <>
      {close ? (
        <View className="justify-center h-full">
          <Text className="self-center mb-[3vh] text-base">Payment is taking place...</Text>
          <ActivityIndicator size={'large'} animating={true} color={MD2Colors.red800} />
        </View>
      ) : (
        <View className="justify-center self-center h-full w-[80%]">
          <Text className="font-semibold text-sm text-center">
            Payment completed successfully, you are redirected to the homepage.
          </Text>
        </View>
      )}
    </>
  );
};

export default LoadingPage;
