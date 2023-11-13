import React from 'react';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Udashboard from '../telas/Usuario/dashboard';
import Configuracoes from '../telas/usuario/Usuarioconfiguracoes';
import ChamadosNavigator from './ChamadosNavigator';

export default function UsuarioNavigator({ navigation }) {
  const Tab = createUsuarioTabNavigator();
    return (
      <Tab.Navigator initialRouteName="Chamados">
        <Tab.Screen name="Chamados" component={ChamadosNavigator} />
        <Tab.Screen name="Udashboard" component={Udashboard} />
        <Tab.Screen name="Configurações" component={Configuracoes} /> 
      </Tab.Navigator>
    );   
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });