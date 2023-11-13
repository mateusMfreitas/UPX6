import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth } from "firebase/auth";
import {  doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import InserirComentario from '../../componentes/inserirComentario';
export default function EditarChamado({ navigation, route }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [status, setStatus] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [showForm, setShowForm] = useState(false);


    const { item } = route.params;
    const fecharFormulario = () => {
      setShowForm(false);
  };
    const forceUpdate = () => {
        setRefresh(currentState => !currentState);
      };
      const handleAdicionarComentario = async () => {
        try {
          const itemRef = doc(db, "chamados", item.id);
          updateDoc(itemRef, {
            status: 'finalizado'
          });
            Alert.alert("Sucesso", "Chamado finalizado com sucesso!");
        } catch (error) {
            Alert.alert("Erro", "Erro ao finalizar chamado.");
        }
    };
    const handleFecharChamado = async () => {
        try {
          const itemRef = doc(db, "chamados", item.id);
          updateDoc(itemRef, {
            status: 'finalizado'
          });
            Alert.alert("Sucesso", "Chamado finalizado com sucesso!");
        } catch (error) {
            Alert.alert("Erro", "Erro ao finalizar chamado.");
        }
    };
    const handleAlterarResponsavel = async () => {
        auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid;
        const usuariosRef = collection(db, "usuarios");
        const q = query(usuariosRef, where("uid", "==", uid));

        getDocs(q).then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const data = querySnapshot.docs.map(doc => doc.data());
                const usuarioValue = data[0].usuario;
                const itemRef = doc(db, "chamados", item.id);
              updateDoc(itemRef, {
                responsavel: usuarioValue
              })
              .then(() => {
                Alert.alert("Campo 'responsavel' atualizado com sucesso!");
                forceUpdate();
              })
              .catch((error) => {
                Alert.alert("Erro ao atualizar o documento:");
              });
          
            } else {
              Alert.alert("Não foi encontrado um usuário com o UID fornecido.");
            }
          }).catch((error) => {
            Alert.alert("Erro ao obter o documento:");
          });
    }

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
            <InserirComentario fecharFormulario={fecharFormulario} id={item.id} />
          )}

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