import {SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebaseConfig';

export default function Login({ navigation }) {
  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');

  async function handleLogin(){
    
    const auth = getAuth();
    try {
      const credenciais = await signInWithEmailAndPassword(auth, username, password);
      const user = credenciais.user;
      navigation.navigate('BottomNavigator');
    }catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  }

  return (
      <SafeAreaView style={styles.container}>
          <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="Usuário"
          />
          <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}
          />
          <Button
            title="Login"
            onPress={handleLogin}
          />
          <Button
            title="Cadastro"
            onPress={() => navigation.navigate('Cadastro')}>
          </Button>
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
