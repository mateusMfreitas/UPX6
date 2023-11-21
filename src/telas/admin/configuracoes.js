import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../../firebaseConfig';
import { addDoc, collection, getDocs, deleteDoc, query, where, doc } from "firebase/firestore"; 
import { estilosComuns } from '../../estilo/estilosComuns';

export default function Configuracoes({ navigation, route }) {
  const [descricao, setDescricao] = useState('');
  const [setores, setSetores] = useState([]);

  const handleExcluirSetor = async (nome) => {
    try {
      const q = query(collection(db, "setores"), where("nome", "==", nome));
        const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      getSetores();
  
      Alert.alert("Sucesso", "Setor excluído com sucesso!");
  
    } catch (error) {
      console.error("Erro ao excluir setor:", error);
      Alert.alert("Erro", "Erro ao excluir setor.");
    }
  };
    
  const handleAdicionarSetor = async () => {
    if (!descricao) {
      Alert.alert("Atenção", "Por favor, preencha o campo!");
      return;
    }

    try {
      await addDoc(collection(db, "setores"), {
        nome: descricao
      });

      Alert.alert("Sucesso", "Setor adicionado!");
      setDescricao('');
      getSetores();

    } catch (error) {
      console.error("Erro ao adicionar setor:", error);
      Alert.alert("Erro", "Erro ao adicionar setor.");
    }
  };

  const zerarSetores = () => {
    setSetores([]);
  };

  const getSetores = async () => {
    zerarSetores();
    const setoresSnapshot = await getDocs(collection(db, "setores"));
    setoresSnapshot.forEach(doc => {
      setSetores(prevSetores => [...prevSetores, doc.data()]);
    });
  };

  useEffect(() => {
    getSetores();
  }, [route.params?.atualizarTudo]);

  const Item = ({ nome }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{nome}</Text>
      <TouchableOpacity style={estilosComuns.deleteButton} onPress={() => handleExcluirSetor(nome)}>
        <Text style={estilosComuns.buttonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return( 
    <View>
      <Text style={styles.title}>Adicionar novo setor</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome"
          value={descricao}
          onChangeText={setDescricao}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={estilosComuns.button} onPress={handleAdicionarSetor}>
        <Text style={estilosComuns.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Setores disponíveis</Text>      
      <FlatList 
        data={setores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Item nome={item.nome}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '80%',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
