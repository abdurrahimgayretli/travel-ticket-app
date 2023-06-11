import React from 'react';

import { TextInput, Text } from 'react-native-paper';
import { View } from 'react-native';

interface content {
  inputName: string;
  height: number;
  font?: string;
}

const Input = (props: content) => {
  return (
    <>
      <Text className={`text-xs ${props.font}`}>{props.inputName}</Text>
      <TextInput
        className={`bg-white self-center mb-1 text-sm  w-[100%] h-[${props.height.toString()}vh]`}
        mode="outlined"
        outlineColor="gray"
      />
    </>
  );
};

export default Input;
