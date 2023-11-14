import React from 'react';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  StyleSheet } from 'react-native';
import Adashboard from '../telas/admin/dashboard';
import Configuracoes from '../telas/admin/configuracoes';
import ChamadosNavigator from './ChamadosNavigator';
import Graficos from '../telas/admin/graficos';

export default function BottomNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator initialRouteName="Adashboard">
        <Tab.Screen name="Adashboard" component={Adashboard} />
        <Tab.Screen name="Chamados" component={ChamadosNavigator} />
        <Tab.Screen name="Graficos" component={Graficos} />
        <Tab.Screen name="Configuracoes" component={Configuracoes} initialParams={{ atualizarTudo: true }} />
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