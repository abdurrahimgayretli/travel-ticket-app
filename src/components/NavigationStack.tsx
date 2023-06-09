/* eslint-disable prettier/prettier */
import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import SearchTicket from '../pages/SearchTicket';

const NavigationStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Sign Up" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Search Ticket" component={SearchTicket} />
    </Stack.Navigator>
  );
};

export default NavigationStack;
