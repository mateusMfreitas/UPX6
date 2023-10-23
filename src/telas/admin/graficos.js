import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import GraficoChamadosBarra from '../../componentes/graficoChamadosBarra';
import GraficoChamadosResolvidos from '../../componentes/graficoChamadosResolvidos';

export default function Graficos({ navigation }) {
 return( 
    <View>
        <GraficoChamadosBarra></GraficoChamadosBarra>
        <GraficoChamadosResolvidos></GraficoChamadosResolvidos>
    </View>
 );

}


