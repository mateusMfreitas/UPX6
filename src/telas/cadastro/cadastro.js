import {SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../../firebaseConfig';
import { addDoc, collection } from "firebase/firestore"; 


export default function Cadastro({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const criarUsuario = async () => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        Alert.alert('Sucesso', `Usuário ${username} criado com sucesso!`);
        const docRef = addDoc(collection(db, "usuarios"), {
          usuario: username,
          uid: userCredential.user.uid,
          admin: false,
          email: email
        });
        navigation.navigate('Login');
      }).catch((error)=> {
        Alert.alert('Erro', 'Erro ao criar usuário: ' + error.message);
      });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar usuário: ' + error.message);

    }
  };

  return (
      <SafeAreaView style={styles.container}>
          <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
              placeholder="E-Usuário"
          />
          <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="E-Mail"
          />
          <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}  // Oculta o texto da senha
          />
          <Button
            title="Criar Usuário"
            onPress={criarUsuario}
          ></Button>
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
