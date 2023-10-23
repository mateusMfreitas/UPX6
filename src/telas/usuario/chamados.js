import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import InserirChamado from '../../componentes/inserirChamado'; 
import ListarChamados from '../../componentes/listarChamados';
import Item from '../../componentes/item';

export default function Chamados({ navigation }) {
    const [showForm, setShowForm] = useState(false);
    const [chamados, setChamados] = useState([]);
    const [atualizarChamados, setAtualizarChamados] = useState(false);
    const [carregando, setCarregando] = useState(true);


    useEffect(() => {
      const recuperarChamados = async () => {
          try {
              const chamados = await ListarChamados();
              setChamados(chamados);
              setCarregando(false);

          } catch (error) {
              console.error("Erro ao obter chamados: ", error);
          }
      };

      recuperarChamados();
  },  [atualizarChamados]);
    const fecharFormulario = () => {
        setShowForm(false);
        setAtualizarChamados(prev => !prev);
    };
    return (
        <View style={styles.container}>
          {carregando ? 
          <ActivityIndicator size='large' color='black'/>
          :
          <FlatList 
            data={chamados}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Item navigation={navigation} item={item}/>}
          />
          }
          {!showForm ? (
            <Button title="Inserir Chamado" onPress={() => setShowForm(true)} />
          ) : (
            <InserirChamado fecharFormulario={fecharFormulario} />
          )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
