import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { exditions } from '../data';

const numberOfItemsPerPageList = [2, 3, 4];

const SelectExpedition = ({ navigation }: any) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, exditions.length);

  const tableRow = (item: any, i: number) => (
    <DataTable.Row
      key={i}
      onPress={() => {
        navigation.navigate('Details Of Expedition', item);
      }}>
      <DataTable.Cell>{item.firm}</DataTable.Cell>
      <DataTable.Cell numeric>{item.time}</DataTable.Cell>
      <DataTable.Cell numeric>{item.seats.filter((e: any) => e.gender === 'empty').length}</DataTable.Cell>
      <DataTable.Cell numeric>{item.price}</DataTable.Cell>
    </DataTable.Row>
  );

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Firm</DataTable.Title>
          <DataTable.Title numeric>Time</DataTable.Title>
          <DataTable.Title numeric>Empty Seat</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
        </DataTable.Header>
        {exditions
          .slice(page * numberOfItemsPerPage, page * numberOfItemsPerPage + numberOfItemsPerPage)
          .map((row, i) => tableRow(row, i))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(exditions.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${exditions.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  );
};

export default SelectExpedition;
