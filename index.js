/**
 * @format
 */
import React from 'react';
import App from './src/App';
import { registerRootComponent } from 'expo';

const AppWrapper = () => <App />;

registerRootComponent(AppWrapper);
