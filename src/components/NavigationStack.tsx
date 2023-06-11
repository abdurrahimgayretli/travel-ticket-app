/* eslint-disable prettier/prettier */
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import SearchTicket from '../pages/SearchTicket';
import SelectExpedition from '../pages/SelectExpedition';
import DetailOfExpedition from '../pages/DetailOfExpedition';

const NavigationStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Search Ticket" component={SearchTicket} />
      <Stack.Screen name="Select Expedition" component={SelectExpedition} />
      <Stack.Screen name="Details Of Expedition" component={DetailOfExpedition} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
