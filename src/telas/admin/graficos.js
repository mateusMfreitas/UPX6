import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import GraficoChamadosBarra from '../../componentes/graficoChamadosBarra';
import GraficoChamadosResolvidos from '../../componentes/graficoChamadosResolvidos';
import GraficoChamadosSetor from '../../componentes/graficoChamadosSetor';


export default function Graficos({ navigation }) {
 return( 
    <ScrollView>
        <GraficoChamadosBarra></GraficoChamadosBarra>
        <GraficoChamadosResolvidos></GraficoChamadosResolvidos>
        <GraficoChamadosSetor></GraficoChamadosSetor>
    </ScrollView>
 );

}


