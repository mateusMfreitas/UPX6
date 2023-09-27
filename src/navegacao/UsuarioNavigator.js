import React from 'react';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  StyleSheet } from 'react-native';
import Udashboard from '../telas/usuario/dashboard';

export default function UsuarioNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator initialRouteName="Udashboard">
        <Tab.Screen name="Udashboard" component={Udashboard} />
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