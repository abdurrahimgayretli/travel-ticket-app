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

  const [ids, setIds] = useState<Number[]>([]);

  const [selectedSeat, setSelectedSeat] = useState<SeatType[]>([]);
  const [onSelect, setOnSelect] = useState({ seatNo: 0, on: false });
  const [totalPrice, setTotalPrice] = useState(0);

  const setId = (i: number, val: number) => {
    let newArr = [...ids]; // copying the old datas array
    newArr[i] = val;
    setIds(newArr);
  };

  const removeElement = (i: number) => {
    setSelectedSeat((current) => current.filter((val) => val.seatNo !== i));
  };

  const setSeat = (i: number, gender: string) => {
    setSelectedSeat((e) => [...e!, { seatNo: i, gender: gender }]);
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
    <View className="items-center absolute flex-row bg-white top-[-7.5vh] h-[7vh] w-[26vw] border rounded-md">
      <View
        className={`${'bg-pink-400'} items-center h-[5vh] w-[10vw] border ml-2 `}
        onTouchStart={() => {
          genderControl(i, 'female', 'male');
        }}>
        <Icon size={30} name={`user-female`} />
      </View>
      <View
        className={`${'bg-blue-400'} items-center h-[5vh] w-[10vw] border ml-2`}
        onTouchStart={() => {
          genderControl(i, 'male', 'female');
        }}>
        <Icon size={30} name={`user`} />
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
        key={i}
        color={'red'}
        size={30}
        name={`${selectedSeat[index].gender === 'male' ? 'user' : 'user-female'}`}
      />
    ) : (
      <Text key={i} className="text-xl">
        {i}
      </Text>
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
        style={{ marginTop: size }}
        className={`${
          route.params.seats[i - 1]?.gender !== 'empty' ? 'bg-slate-500' : null
        } items-center h-[5vh] w-[10vw] border mr-2`}>
        {route.params.seats[i - 1]?.gender === 'empty' ? (
          <>
            {i === onSelect.seatNo && onSelect.on && selectSeat(i)}
            {selectedSeat.length !== 0 ? genderView(i) : <Text className="text-xl">{i}</Text>}
          </>
        ) : (
          <Icon
            key={i + 1}
            size={30}
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

  useEffect(() => {
    setTotalPrice(selectedSeat.length * route.params.price);
  }, [selectedSeat]);

  for (let i = 1; i < 32; i++) {
    if (i < 11) {
      rowState1.push(seatView(i, 0));
    } else if (i < 21) {
      rowState2.push(seatView(i, 5));
    } else if (i < 31) {
      rowState3.push(seatView(i, 20));
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
          <View className="w-[135vw] h-[30vh] p-[2vh] top-[5.5vh] items-center">
            <View className="border rounded-lg w-[130vw] h-[23vh] absolute"></View>
            <View className="flex-row">{rowState1}</View>
            <View className="flex-row">{rowState2}</View>
            <View className="flex-row">{rowState3}</View>
          </View>
        </ScrollView>

        <View className="top-[-4vh]">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Passenger ID</DataTable.Title>
              <DataTable.Title numeric>Passenger Gender</DataTable.Title>
              <DataTable.Title numeric>Seat No</DataTable.Title>
            </DataTable.Header>

            {selectedSeat.map((val, i) => {
              return (
                <DataTable.Row key={val.seatNo}>
                  <DataTable.Cell>
                    <TextInput
                      inputMode="numeric"
                      onChangeText={(e) => setId(i, Number(e))}
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
          {selectedSeat.length > 0 && (
            <Button
              onPress={() => {
                if (
                  selectedSeat.length === ids.length &&
                  ids.findIndex((e) => {
                    return e === 0;
                  }) === -1
                ) {
                  navigation.navigate('Purchase Page', [
                    totalPrice,
                    route.params,
                    selectedSeat.length,
                  ]);
                } else {
                  ToastAndroid.show(
                    'Passenger numbers should not be left blank.',
                    ToastAndroid.SHORT
                  );
                }
              }}
              mode="outlined"
              className="w-[25vh] mt-3 self-center">
              BUY {totalPrice} TL{' '}
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailOfExpedition;
