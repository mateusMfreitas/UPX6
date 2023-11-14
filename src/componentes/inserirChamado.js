import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Picker, Text, Alert } from 'react-native';
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";


export default function InserirChamado({ fecharFormulario, navigation }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [setores, setSetores] = useState([]);
    const [selecionado, setSelecionado] = useState('');

    const chamadoInserido = async () => {
        if (!nome || !descricao) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos!");
            return;
        }

        try {
            const auth = getAuth();
            const user = auth.currentUser;
            await addDoc(collection(db, "chamados"), {
                nome: nome,
                descricao: descricao,
                dataAdicionado: new Date().toISOString(),
                status: 'pendente',
                responsavel: null,
                solicitante: user.email
            });
            Alert.alert("Sucesso", "Chamado adicionado com sucesso!");

            setNome('');
            setDescricao('');
            navigation.navigate('ListaChamados', { atualizarTudo: true });

        } catch (error) {
            console.error("Erro ao adicionar chamado:", error);
            Alert.alert("Erro", "Erro ao adicionar chamado.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'setores'));
            const dados = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setSetores(dados);
          } catch (error) {
            console.error('Erro ao buscar setores:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <View style={styles.form}>
            <Button title="Fechar" onPress={fecharFormulario} />

            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
            <TextInput
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
            />
            <Text>Selecione o setor do chamado:</Text>
            
            
            <Button title="Salvar Chamado" onPress={chamadoInserido} />
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
