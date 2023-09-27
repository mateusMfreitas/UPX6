import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


export default function ADashboard({ navigation }) {
 return( 
  <View style={styles.container}>
    <Text>Aqui terão gráficos e infomações gerais sobre o aplicativo, chamados e seu desempenho </Text> 
  </View>
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
