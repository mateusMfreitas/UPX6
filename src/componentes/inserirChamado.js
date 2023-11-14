import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Picker, Text, Alert } from 'react-native';
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import { getAuth } from "firebase/auth";
import RNPickerSelect from 'react-native-picker-select';



export default function InserirChamado({ fecharFormulario, navigation }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [setores, setSetores] = useState([]);
    const [setor, setSetor] = useState(null);
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
                solicitante: user.email,
                setor: setor
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
                label: doc.data().nome,
                value: doc.data().nome, // ou doc.id, dependendo do que você quer usar como valor
                id: doc.id,
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
            <RNPickerSelect
                onValueChange={(value) => setSetor(value)}
                items={setores}
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
