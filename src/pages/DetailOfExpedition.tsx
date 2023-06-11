import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, DataTable, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

interface SeatType {
  seatNo: number;
  gender: string;
}

const DetailOfExpedition = ({ navigation, route }: any) => {
  var rowState1: JSX.Element[] = [];
  var rowState2: JSX.Element[] = [];
  var rowState3: JSX.Element[] = [];

  const [selectedSeat, setSelectedSeat] = useState<SeatType[]>([]);
  const [onSelect, setOnSelect] = useState({ seatNo: 0, on: false });

  const removeElement = (i: number) => {
    setSelectedSeat((current) => current.filter((val) => val.seatNo !== i));
  };

  const setSeat = (i: number, gender: string) => {
    var index = selectedSeat.findIndex((e) => {
      return e.seatNo === i;
    });
    var bool =
      selectedSeat.findIndex((e) => {
        return e.seatNo === i;
      }) === -1;

    let newArray = [...selectedSeat];
    newArray[index] = { seatNo: i, gender: gender };

    bool
      ? setSelectedSeat((e) => [...e!, { seatNo: i, gender: gender }])
      : setSelectedSeat(newArray);
  };

  const genderControl = (i: number, gender1: string, gender2: string) => {
    i <= 10
      ? route.params.seats[i + 9]?.gender === gender2
        ? ToastAndroid.show('A woman cannot sit next to a man.', ToastAndroid.SHORT)
        : setSeat(i, gender1)
      : i <= 20
      ? route.params.seats[i - 11]?.gender === gender2
        ? ToastAndroid.show('A man cannot sit next to a woman.', ToastAndroid.SHORT)
        : setSeat(i, gender1)
      : setSeat(i, gender1);
  };

  const selectSeat = (i: number) => (
    <View className="items-center absolute flex-row bg-white top-[-7vh] h-[5.5vh] w-[12vh] border rounded-md">
      <View
        className={`${'bg-pink-400'} items-center h-[4vh] w-[4vh] border ml-2 `}
        onTouchStart={() => {
          genderControl(i, 'female', 'male');
        }}>
        <Icon size={25} name={`user-female`} />
      </View>
      <View
        className={`${'bg-blue-400'} items-center h-[4vh] w-[4vh] border ml-2`}
        onTouchStart={() => {
          genderControl(i, 'male', 'female');
        }}>
        <Icon size={25} name={`user`} />
      </View>
    </View>
  );

  const genderView = (i: number) => {
    var index = 0;
    index = selectedSeat.findIndex((e) => {
      return e.seatNo === i;
    });
    return selectedSeat[index]?.seatNo === i ? (
      <Icon
        color={'red'}
        size={25}
        name={`${selectedSeat[index].gender === 'male' ? 'user' : 'user-female'}`}
      />
    ) : (
      <Text className="text-base">{i}</Text>
    );
  };

  const seatView = (i: number, size: number) => {
    return (
      <View
        key={i}
        onTouchEnd={() => {
          var bool =
            selectedSeat.findIndex((e) => {
              return e.seatNo === i;
            }) === -1;
          bool
            ? selectedSeat.length !== 5
              ? setOnSelect({ seatNo: i, on: true })
              : ToastAndroid.show('Only 5 seats can be selected', ToastAndroid.SHORT)
            : removeElement(i);
        }}
        className={`${
          route.params.seats[i - 1]?.gender !== 'empty' ? 'bg-slate-500' : null
        } items-center h-[4vh] w-[4vh] border mr-2 mt-[${size}vh]`}>
        {route.params.seats[i - 1]?.gender === 'empty' ? (
          <>
            {i === onSelect.seatNo && onSelect.on && selectSeat(i)}
            {selectedSeat.length !== 0 ? genderView(i) : <Text className="text-base">{i}</Text>}
          </>
        ) : (
          <Icon
            size={25}
            name={`${
              route.params.seats[i - 1]?.gender === 'male'
                ? 'user'
                : route.params.seats[i - 1]?.gender === 'female'
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
      rowState3.push(seatView(i, 5));
    }
  }

  return (
    <ScrollView>
      <View onTouchStart={() => setOnSelect({ ...onSelect, on: false })}>
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
            <DataTable.Cell numeric>
              {route.params.seats.filter((e: any) => e.gender === 'empty').length}
            </DataTable.Cell>
            <DataTable.Cell numeric>{route.params.price}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <ScrollView horizontal={true} className="m-[2vh]">
          <View className="w-[60vh] h-[30vh] p-[2vh] top-[6vh] items-center">
            <View className="border rounded-lg w-[55vh] h-[22vh] absolute"></View>
            <View className="flex-row">{rowState1}</View>
            <View className="flex-row">{rowState2}</View>
            <View className="flex-row">{rowState3}</View>
          </View>
        </ScrollView>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Passenger ID</DataTable.Title>
            <DataTable.Title numeric>Passenger Gender</DataTable.Title>
            <DataTable.Title numeric>Seat No</DataTable.Title>
          </DataTable.Header>

          {selectedSeat.map((val) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>
                  <TextInput
                    mode="flat"
                    contentStyle={{ marginStart: -10, marginEnd: -10 }}
                    className=" text-xs h-[4vh] w-[10vh] bg-white"
                  />
                </DataTable.Cell>
                <DataTable.Cell numeric>{val.gender.toUpperCase()}</DataTable.Cell>
                <DataTable.Cell numeric>{val.seatNo}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default DetailOfExpedition;
