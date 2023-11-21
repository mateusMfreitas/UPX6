import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity,ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import {  doc, updateDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import InserirComentario from '../../componentes/inserirComentario';
import { estilosComuns } from '../../estilo/estilosComuns';

export default function EditarChamado({ navigation, route }) {
    const [showForm, setShowForm] = useState(false);
    const { item } = route.params;
    const { id } = route.params;
    const fecharFormulario = () => {
      setShowForm(false);
  };
    const handleFecharChamado = async () => {
        try {
          const itemRef = doc(db, "chamados", id);
          updateDoc(itemRef, {
            status: 'finalizado'
          });
          navigation.navigate('ListaChamados', { atualizarTudo: true });
            Alert.alert("Sucesso", "Chamado finalizado com sucesso!");
            
        } catch (error) {
            Alert.alert("Erro", "Erro ao finalizar chamado.");
        }
    };
    const handleAlterarResponsavel = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("uid", "==", uid));
    
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const usuarioValue = querySnapshot.docs[0].data().usuario;
      const itemRef = doc(db, "chamados", item.id);

      await updateDoc(itemRef, {
        responsavel: usuarioValue
      });

      const docSnap = await getDoc(itemRef);

      Alert.alert("Campo 'responsavel' atualizado com sucesso!");
      navigation.navigate('EditarChamado', { item: docSnap.data() });
    } else {
      Alert.alert("Não foi encontrado um usuário com o UID fornecido.");
    }
  } catch (error) {
    Alert.alert("Erro ao executar operações:", error.message);
  }
};

    const Item = ({ comentario, style }) => (
      <View style={style}>
        <Text>{comentario}</Text>
      </View>
    );

    return( 
      <View>
        <ScrollView>
        <Text style={styles.label}>Título</Text>
        <Text style = {styles.input}>{item.nome}</Text>
        <Text style={styles.label}>Descrição</Text>
        <Text style = {styles.input}>{item.descricao}</Text>
        <Text style={styles.label}>Responsável</Text>
        <Text style = {styles.input}>{item.responsavel}</Text>
        <Text style={styles.label}>Status</Text>
        <Text style = {styles.input}>{item.status}</Text>
        <TouchableOpacity style={estilosComuns.button} onPress={handleAlterarResponsavel}>
          <Text style={estilosComuns.buttonText}>Add aos meus chamados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilosComuns.closeButton} onPress={handleFecharChamado}>
          <Text style={estilosComuns.buttonText}>Fechar Chamado</Text>
        </TouchableOpacity>
        
        <FlatList
          data={item.comentarios}
          renderItem={({ item }) => <Item style={styles.item} comentario={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        {!showForm ? (
          <TouchableOpacity style={estilosComuns.button} onPress={() => setShowForm(true)}>
            <Text style={estilosComuns.buttonText}>Comentar</Text>
          </TouchableOpacity>
        ) : (
          <InserirComentario fecharFormulario={fecharFormulario} id={item.id} navigation={navigation} item={item} />
        )}
        </ScrollView>
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
    item: {
      backgroundColor: '#ADD8E6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1, 
      borderColor: '#000', 
      borderRadius: 5, 
    },
    label: {
      fontWeight: 'bold',
    }
});