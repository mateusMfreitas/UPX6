import {SafeAreaView, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import { estilosComuns } from '../../estilo/estilosComuns';


export default function Login({ navigation }) {
  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');

  async function handleLogin(){
    
    const auth = getAuth();
    try {
      const credenciais = await signInWithEmailAndPassword(auth, username, password);
      const user = credenciais.user;
      const q = query(collection(db, "admins"), where("email", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        navigation.navigate('BottomNavigator');
      }else{
        navigation.navigate('UsuarioNavigator');
      }
    }catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  }

  return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/7.jpg')}
        />
          <TextInput
              style={estilosComuns.input}
              onChangeText={setUsername}
              value={username}
              placeholder="E-Mail"
          />
          <TextInput
              style={estilosComuns.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Senha"
              secureTextEntry={true}
          />
          <TouchableOpacity style={estilosComuns.button} onPress={handleLogin}>
  <Text style={estilosComuns.buttonText}>Login</Text>
</TouchableOpacity>

<Text style={styles.signupText}>Ainda não tem uma conta? Cadastre-se</Text>


<TouchableOpacity style={estilosComuns.button} onPress={() => navigation.navigate('Cadastro')}>
  <Text style={estilosComuns.buttonText}>Cadastro</Text>
</TouchableOpacity>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Use a more neutral color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Add some padding
  },

  signupText: {
    color: '#007BFF',
    fontSize: 12, // Reduce the font size
    marginBottom: 12,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  }
});
