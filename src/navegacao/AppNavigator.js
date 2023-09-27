import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from '../telas/cadastro/cadastro';
import Login from '../telas/cadastro/login';
import BottomNavigator from './BottomNavigator';
import UsuarioNavigator from './UsuarioNavigator';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="UsuarioNavigator" component={UsuarioNavigator} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
