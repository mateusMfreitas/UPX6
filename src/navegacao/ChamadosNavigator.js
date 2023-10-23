import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chamados from '../telas/admin/chamados';
import EditarChamado from '../telas/admin/EditarChamado';



const Stack = createStackNavigator();

function ChamadosNavigator() {
  return (
    <Stack.Navigator initialRouteName="Chamados">
      <Stack.Screen name="ListaChamados" component={Chamados} />
      <Stack.Screen name="EditarChamado" component={EditarChamado} />
    </Stack.Navigator>
  );
}

export default ChamadosNavigator;
