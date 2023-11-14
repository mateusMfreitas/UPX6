import React from 'react';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Configuracoes from '../telas/usuario/Usuarioconfiguracoes';
import Chamados from '../telas/usuario/chamados';
import ChamadosFinalizados from '../telas/usuario/chamadosFinalizados';

export default function UsuarioNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();

    return (
      <Tab.Navigator initialRouteName="ListaChamados">
        <Tab.Screen name="ListaChamados" component={Chamados} initialParams={{ atualizarTudo: true }} />
        <Tab.Screen name="Configuracoes" component={Configuracoes} /> 
        <Tab.Screen name="ListaChamadosFinalizados" component={ChamadosFinalizados} initialParams={{ atualizarTudo: true }} />
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