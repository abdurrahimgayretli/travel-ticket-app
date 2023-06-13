import React, { useState, useEffect } from 'react';
import { View, ToastAndroid } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Input from '../components/Input';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { ticketCalender } from '../data';

interface SearchType {
  from: string;
  to: string;
  date: Date;
}

const data = [
  { label: 'Trabzon', value: '1' },
  { label: 'Istanbul', value: '2' },
  { label: 'Erzurum', value: '3' },
  { label: 'Tekirdag', value: '4' },
];

const SearchTicket = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const searchArray = ['From', 'To'];
  const [searchInput, setSearchInput] = useState<SearchType>({
    from: '',
    to: '',
    date: new Date(Date.now()),
  });

  const search = () => {
    if (
      searchInput.from === ticketCalender.from &&
      searchInput.to === ticketCalender.to &&
      ticketCalender.date.findIndex((e) => e.toDateString() === searchInput.date.toDateString()) !==
        -1
    ) {
      navigation.navigate('Select Expedition');
    } else {
      ToastAndroid.show(
        'The expedition for the specified information could not be found.',
        ToastAndroid.LONG
      );
    }
  };

  return (
    <View className="self-center w-[90%] rounded-md p-[1vh] top-[%10]">
      {searchArray.map((index, i) => {
        return (
          <View key={i}>
            <Text className="text-base font-bold">{index}</Text>
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
              placeholder={`Select ${index}`}
              labelField={'label'}
              valueField={'value'}
              onChange={(e) => {
                setSearchInput({ ...searchInput, [index.toLowerCase()]: e.label });
              }}
            />
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
      {open === true && (
        <RNDateTimePicker
          onChange={(e, date) => {
            setOpen(false);
            setSearchInput({ ...searchInput, date: date! });
          }}
          mode="date"
          display="inline"
          value={searchInput.date}
        />
      )}
      <Button
        mode="contained"
        className=" bg-gray-600 w-[90%] self-center mt-1"
        onPress={() => {
          search();
        }}>
        Search Ticket
      </Button>
    </View>
  );
};

export default SearchTicket;
