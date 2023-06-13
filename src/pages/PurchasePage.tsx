import { Text, ToastAndroid, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, DataTable } from 'react-native-paper';
import Input from '../components/Input';
import { ScrollView } from 'react-native-gesture-handler';

interface CardInfoType {
  cardNo?: number;
  nameOnCard: string;
  cvc?: number;
  expirationDate: string;
}

const PurchasePage = ({ navigation, route }: any) => {
  const infoArray = [
    { name: 'Card No', size: '80%' },
    { name: 'Name On Card', size: '80%' },
    { name: 'CVC', size: '25%' },
    { name: 'Date', size: '25%' },
  ];
  const [cardInfo, setCardInfo] = useState<CardInfoType>({
    cardNo: 0,
    nameOnCard: '',
    cvc: 0,
    expirationDate: '',
  });

  const onChangeNameOnCard = (e: string) => {
    setCardInfo((val: CardInfoType) => ({ ...val, nameOnCard: e }));
  };
  const onChangeCardNo = (e: number) => {
    setCardInfo((val: CardInfoType) => ({ ...val, cardNo: e }));
  };
  const onChangeCVC = (e: number) => {
    setCardInfo((val: CardInfoType) => ({ ...val, cvc: e }));
  };
  const onChangeDate = (e: string) => {
    setCardInfo((val: CardInfoType) => ({ ...val, expirationDate: e }));
  };

  return (
    <View>
      <ScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Firm</DataTable.Title>
            <DataTable.Title numeric>Time</DataTable.Title>
            <DataTable.Title numeric>Total Seat</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{route.params[1].firm}</DataTable.Cell>
            <DataTable.Cell numeric>{route.params[1].time}</DataTable.Cell>
            <DataTable.Cell numeric>{route.params[2]}</DataTable.Cell>
            <DataTable.Cell numeric>{route.params[0]}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View className="top-[5vh] h-[40vh]">
          <View style={{ width: infoArray[0].size }} className="self-center">
            <Input
              onChange={onChangeCardNo}
              inputMode="numeric"
              inputName={infoArray[0].name}
              height={5}
            />
          </View>
          <View style={{ width: infoArray[1].size }} className="self-center">
            <Input
              onChange={onChangeNameOnCard}
              inputMode="text"
              inputName={infoArray[1].name}
              height={5}
            />
          </View>
          <View className="flex-row self-center">
            <View style={{ width: infoArray[2].size }} className="">
              <Input
                onChange={onChangeCVC}
                inputMode="numeric"
                inputName={infoArray[2].name}
                height={5}
              />
            </View>
            <View style={{ width: infoArray[3].size }} className="ml-[2vw]">
              <Input
                onChange={onChangeDate}
                inputMode="numeric"
                inputName={infoArray[3].name}
                height={5}
              />
            </View>
          </View>
          <Button
            onPress={() => {
              if (
                cardInfo.cardNo === 0 ||
                cardInfo.cvc === 0 ||
                cardInfo.expirationDate === '' ||
                cardInfo.nameOnCard === ''
              ) {
                ToastAndroid.show('Card information cannot be null', ToastAndroid.SHORT);
              } else {
                navigation.navigate('Loading Page');
              }
            }}
            className="w-[50vw] self-center mt-[2vh]"
            mode="outlined">
            Pay
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default PurchasePage;
