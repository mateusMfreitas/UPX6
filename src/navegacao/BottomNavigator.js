import React from 'react';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  StyleSheet } from 'react-native';
import Configuracoes from '../telas/admin/configuracoes';
import ChamadosNavigator from './ChamadosNavigator';
import Graficos from '../telas/admin/graficos';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BottomNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator initialRouteName="Chamados">
        <Tab.Screen name="Chamados" component={ChamadosNavigator} options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="list" color={color} size={size} />
    ),
  }}  />
        <Tab.Screen name="Graficos" component={Graficos} options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="bar-chart" color={color} size={size} />
    ),
  }} />
        <Tab.Screen name="Configuracoes" component={Configuracoes} initialParams={{ atualizarTudo: true }} options={{
    tabBarIcon: ({ color, size }) => (
      <Icon name="settings" color={color} size={size} />
    ),
  }}  />
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