import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chamados from '../telas/admin/chamados';
import EditarChamado from '../telas/admin/EditarChamado';
import InserirChamado from '../componentes/inserirChamado';
import ChamadosFinalizados from '../telas/admin/chamadosFinalizados';

const Stack = createStackNavigator();

function ChamadosNavigator() {
  return (
    <Stack.Navigator initialRouteName="Chamados">
      <Stack.Screen name="ListaChamados" component={Chamados} initialParams={{ atualizarTudo: true }} options={{ headerShown: false }} />
      <Stack.Screen name="ListaChamadosFinalizados" component={ChamadosFinalizados} initialParams={{ atualizarTudo: true }} options={{ headerShown: false }}/>
      <Stack.Screen name="EditarChamado" component={EditarChamado} />
      <Stack.Screen name="InserirChamado" component={InserirChamado} />
    </Stack.Navigator>
  );
}

export default ChamadosNavigator;
