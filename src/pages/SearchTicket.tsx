import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Input from '../components/Input';
import DatePicker from 'react-native-date-picker';

interface SearchType {
  from: string;
  to: string;
  date: Date;
}

const SearchTicket = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const searchArray = ['From', 'To'];
  const [searchInput, setSearchInput] = useState<SearchType>({
    from: '',
    to: '',
    date: new Date(Date.now()),
  });
  return (
    <View className="self-center w-[90%] rounded-md p-[1vh] top-[%10]">
      {searchArray.map((index, i) => {
        return (
          <View key={i}>
            <Input inputName={index} height={6} font={'font-bold text-base'}/>
          </View>
        );
      })}
      <Text className="text-base font-bold">Expedition Date</Text>
      <Button
        textColor="black"
        icon={'calendar'}
        labelStyle={{ fontSize: 20 }}
        onPress={() => setOpen(true)}>
        {searchInput.date.toDateString()}
      </Button>
      <DatePicker
        modal
        open={open}
        mode="date"
        date={searchInput.date}
        onConfirm={(date) => {
          setOpen(false);
          setSearchInput({ ...searchInput, date: date });
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button
        mode="contained"
        className=" bg-gray-600 w-[90%] self-center mt-1"
        onPress={() => {
          navigation.navigate('Select Expedition');
        }}>
        Search Ticket
      </Button>
    </View>
  );
};

export default SearchTicket;
