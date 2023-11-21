import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { doc, collection, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import { estilosComuns } from '../estilo/estilosComuns';

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
            console.error("Erro ao adicionar comentario:", error);
            Alert.alert("Erro", "Erro ao adicionar comentario.");
        } 
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.form}>
                <TouchableOpacity onPress={fecharFormulario} style={estilosComuns.button}>
                    <Text style={estilosComuns.buttonText}>Fechar</Text>
                </TouchableOpacity>
                <TextInput
                    placeholder="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                    style={styles.input}
                />
                <TouchableOpacity onPress={comentarioInserido} style={estilosComuns.button}>
                    <Text style={estilosComuns.buttonText}>Salvar Comentario</Text>
                </TouchableOpacity>
            </View>
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
