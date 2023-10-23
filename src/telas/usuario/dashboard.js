import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Text, View } from 'react-native';
import React, { useState } from 'react';

export default function Udashboard() {
  return (
      <SafeAreaView style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bem-vindo ao Dashboard!</Text>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,  
    width: 200,
    padding: 10,
  },  
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
