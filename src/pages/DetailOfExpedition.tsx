import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Button, DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const DetailOfExpedition = ({ navigation, route }: any) => {
  var rowState1: any = [];
  var rowState2: any = [];
  var rowState3: any = [];

  const seatView = (i: number, size: number) => {
    return (
      <View
        className={`${
          route.params.seats[i - 1]?.gender !== 'empty' ? 'bg-slate-500' : null
        } items-center h-[4vh] w-[4vh] border mr-2 mt-[${size}vh]`}>
        {route.params.seats[i - 1]?.gender === 'empty' ? (
          <Text className="text-base">{i}</Text>
        ) : (
          <Icon
            size={25}
            name={`${
              route.params.seats[i - 1]?.gender === 'man'
                ? 'user'
                : route.params.seats[i - 1]?.gender === 'woman'
                ? 'user-female'
                : ''
            }`}
          />
        )}
      </View>
    );
  };

  for (let i = 1; i < 32; i++) {
    if (i < 11) {
      rowState1.push(seatView(i, 0));
    } else if (i < 21) {
      rowState2.push(seatView(i, 1));
    } else if (i < 31) {
      rowState3.push(seatView(i, 4));
    }
  }

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Firm</DataTable.Title>
          <DataTable.Title numeric>Time</DataTable.Title>
          <DataTable.Title numeric>Empty Seat</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>{route.params.firm}</DataTable.Cell>
          <DataTable.Cell numeric>{route.params.time}</DataTable.Cell>
          <DataTable.Cell numeric>{route.params.seats.filter((e: any) => e.gender === 'empty').length}</DataTable.Cell>
          <DataTable.Cell numeric>{route.params.price}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <ScrollView horizontal={true} className="m-[2vh]">
        <View className="w-[55vh] h-[22vh] border rounded-lg p-[2vh]">
          <View className="flex-row">{rowState1}</View>
          <View className="flex-row">{rowState2}</View>
          <View className="flex-row">{rowState3}</View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailOfExpedition;
