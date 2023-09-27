import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';

export default function InserirChamado({ fecharFormulario }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataAdicionado, setDataAdicionado] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [status, setStatus] = useState('');


    const chamadoInserido = async () => {
        if (!nome || !descricao) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos!");
            return;
        }

        try {
            await addDoc(collection(db, "chamados"), {
                nome: nome,
                descricao: descricao,
                dataAdicionado: new Date().toISOString(),
                status: 'pendente',
                responsavel: null

            });
            Alert.alert("Sucesso", "Chamado adicionado com sucesso!");

            setNome('');
            setDescricao('');

            if (fecharFormulario) fecharFormulario();

        } catch (error) {
            console.error("Erro ao adicionar chamado:", error);
            Alert.alert("Erro", "Erro ao adicionar chamado.");
        }
    };

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
