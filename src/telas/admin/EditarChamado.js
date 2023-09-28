import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth } from "firebase/auth";
import {  doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../firebaseConfig';

export default function EditarChamado({ navigation, route  }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [status, setStatus] = useState('');
    const [refresh, setRefresh] = useState(false);

    const { item } = route.params;

    const forceUpdate = () => {
        setRefresh(currentState => !currentState);
      };

    const handleEditarChamado = async () => {
        if (!nome || !descricao || !responsavel || !status) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos!");
            return;
        }

        try {
            const docRef = db.collection('chamados').doc(item.id);
            docRef.update({
                nome: nome,
                descricao: descricao,
                responsavel: responsavel ,
                status: status
            });
            Alert.alert("Sucesso", "Chamado editado com sucesso!");

            setNome('');
            setDescricao('');
            setResponsavel('');
            setStatus('');

        } catch (error) {
            Alert.alert("Erro", "Erro ao atualizar produto.");
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
                console.log(usuarioValue);
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
        <TextInput
                placeholder={item.nome}
                value={nome}
                onChangeText={setNome}
                style={styles.input}
        />
        <Text>Descrição</Text>
            <TextInput
            placeholder={item.descricao}
            value={descricao}
            onChangeText={setDescricao}
            style={styles.input}
        />
        <Text>Responsável</Text>
        <TextInput
            placeholder={item.responsavel}
            value={responsavel}
            onChangeText={setResponsavel}
            style={styles.input}
        />
        <Text>Status</Text>
        <TextInput
            placeholder={item.status}
            value={status}
            onChangeText={setStatus}
            style={styles.input}
        />
            <Button title="Adicionar aos meus chamados" onPress={handleAlterarResponsavel}></Button>
            <Button title="Salvar Alterações" onPress={handleEditarChamado}></Button>
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