import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { doc, collection, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';

export default function InserirComentario({ fecharFormulario,id, navigation, item }) {
    const [descricao, setDescricao] = useState('');

    const comentarioInserido = async () => {
        if (!descricao) {
            Alert.alert("Atenção", "Por favor, preencha o campo!");
            return;
        }

         try {
            const itemRef = doc(db, "chamados", id);
            const docSnap = await getDoc(itemRef);
            if (docSnap.exists) {
                const comentariosAntigos = docSnap.data().comentarios || [];
                const novosComentarios = [...comentariosAntigos, descricao];
                updateDoc(itemRef, {
                    comentarios: novosComentarios
                  });
            }
            const docSnap2 = await getDoc(itemRef);
            item = docSnap2.data();
            Alert.alert("Sucesso", "comentario adicionado com sucesso!");

            setDescricao('');
            navigation.navigate('EditarChamado', { item: item });
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
