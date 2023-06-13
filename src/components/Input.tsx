import React from 'react';

import { TextInput, Text } from 'react-native-paper';
import { InputModeOptions, TextInputProps, View } from 'react-native';

interface content {
  inputName: string;
  height: number;
  font?: string;
  secure?:boolean
  inputMode?: InputModeOptions;
  onChange?: Function;
}

const Input = (props: content) => {
  return (
    <>
      <Text className={`text-xs ${props.font}`}>{props.inputName}</Text>
      <TextInput
        onChangeText={(e) => props.onChange!(e)}
        secureTextEntry={props.secure}
        inputMode={props.inputMode}
        className={`bg-white self-center mb-1 text-sm  w-[100%] h-[${props.height.toString()}vh]`}
        mode="outlined"
        outlineColor="gray"
      />
    </>
  );
};

export default Input;
