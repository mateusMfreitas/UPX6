import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { getAuth } from "firebase/auth";
import {  doc, updateDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import InserirComentario from '../../componentes/inserirComentario';
export default function EditarChamado({ navigation, route }) {
    const [showForm, setShowForm] = useState(false);
    const { item } = route.params;
    const fecharFormulario = () => {
      setShowForm(false);
  };
    const handleFecharChamado = async () => {
        try {
          const itemRef = doc(db, "chamados", item.id);
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

    const Item = ({ comentario }) => (
      <View>
        <Text>{comentario}</Text>
      </View>
    );

    return( 
    <View>

        <Text>Título</Text>
        <Text style = {styles.input}>{item.nome}</Text>
        <Text>Descrição</Text>
        <Text style = {styles.input}>{item.descricao}</Text>
        <Text>Responsável</Text>
        <Text style = {styles.input}>{item.responsavel}</Text>
        <Text>Status</Text>
        <Text style = {styles.input}>{item.status}</Text>
            <Button title="Adicionar aos meus chamados" onPress={handleAlterarResponsavel}></Button>
            <Button title="Finalizar Chamado" onPress={handleFecharChamado}></Button>
            {!showForm ? (
            <Button title="Adicionar comentário" onPress={() => setShowForm(true)} />
          ) : (
            <InserirComentario fecharFormulario={fecharFormulario} id={item.id} navigation={navigation} item={item} />
          )}
         <FlatList
          data={item.comentarios}
          renderItem={({ item }) => <Item comentario={item} />}
          keyExtractor={(item, index) => index.toString()}
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
    }
});