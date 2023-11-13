import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';

export default function InserirComentario({ fecharFormulario,id }) {
    const [descricao, setDescricao] = useState('');

    const comentarioInserido = async () => {
        if (!descricao) {
            Alert.alert("Atenção", "Por favor, preencha o campo!");
            return;
        }

         try {
            await addDoc(collection(db, "chamados"), {
                descricao: descricao,
                dataAdicionado: new Date().toISOString(),
            });
            Alert.alert("Sucesso", "comentario adicionado com sucesso!");

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
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
            />
            <Button title="Salvar Comentario" onPress={comentarioInserido} />
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
