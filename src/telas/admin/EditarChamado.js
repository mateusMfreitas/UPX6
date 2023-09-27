import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


export default function EditarChamado({ navigation, route  }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [status, setStatus] = useState('');
    const { item } = route.params;

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

    return( 
    <View>
        <TextInput
                placeholder={item.nome}
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />
             <TextInput
                placeholder={item.descricao}
                value={descricao}
                onChangeText={setDescricao}
                style={styles.input}
            />
            <TextInput
                placeholder={item.responsavel}
                value={responsavel}
                onChangeText={setResponsavel}
                style={styles.input}
            />
            <TextInput
                placeholder={item.status}
                value={status}
                onChangeText={setStatus}
                style={styles.input}
            />
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