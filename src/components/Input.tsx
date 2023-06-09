import React from 'react';

import { TextInput, Text } from 'react-native-paper';
import { View } from 'react-native';

interface content {
  inputName: string;
  height: number;
}

const Input = (props: content) => {
  return (
    <View>
      <TextInput
        className={`bg-white self-center w-[100%] mb-1 h-[${props.height.toString()}vh]`}
        mode="outlined"
        outlineColor="gray"
      />
    </View>
  );
};

export default Input;
