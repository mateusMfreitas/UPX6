import React from 'react';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Chamados from '../telas/usuario/chamados';
import ChamadosFinalizados from '../telas/usuario/chamadosFinalizados';
import { createStackNavigator } from '@react-navigation/stack';
import ComentariosChamado from '../telas/cadastro/comentariosChamado';


export default function UsuarioNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

    return (

      <Stack.Navigator initialRouteName="Chamados">
        <Stack.Screen name="ListaChamados" component={Chamados} initialParams={{ atualizarTudo: true }} options={{ headerShown: false }} />
        <Stack.Screen name="ListaChamadosFinalizados" component={ChamadosFinalizados} initialParams={{ atualizarTudo: true }} options={{ headerShown: false }} />
        <Stack.Screen name="ComentariosChamado" component={ComentariosChamado} options={{ title: 'Voltar' }}/>
      </Stack.Navigator>
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