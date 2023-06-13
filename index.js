/**
 * @format
 */
import React from 'react';
import App from './src/App';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(AppWrapper);
