import {SafeAreaView, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../../firebaseConfig';
import { addDoc, collection } from "firebase/firestore"; 
import { estilosComuns } from '../../estilo/estilosComuns';


export default function Cadastro({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const criarUsuario = async () => {
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
        Alert.alert('Sucesso', `Usuário ${email} criado com sucesso!`);
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
              style={estilosComuns.input}
              onChangeText={setEmail}
              value={email}
              placeholder="E-Mail"
          />
          <TextInput
              style={estilosComuns.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}  // Oculta o texto da senha
          />
          <TouchableOpacity style={estilosComuns.button}  onPress={criarUsuario}>
            <Text style={estilosComuns.buttonText}>Criar Usuário</Text>
          </TouchableOpacity>
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
