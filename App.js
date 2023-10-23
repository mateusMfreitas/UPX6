import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navegacao/AppNavigator.js';


export default function App() {
    return (
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    );
}
