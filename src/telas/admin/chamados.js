import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import InserirChamado from '../../componentes/inserirChamado'; 
import ListarChamados from '../../componentes/listarChamados';
import ListarChamadosAtivos from '../../componentes/listarChamadosAtivos';

import Item from '../../componentes/item';

export default function Chamados({ navigation }) {
    const [showForm, setShowForm] = useState(false);
    const [chamados, setChamados] = useState([]);
    const [atualizarChamados, setAtualizarChamados] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const recuperarChamados2 = async () => {
      try {
        setCarregando(true);

          const chamados = await ListarChamadosAtivos();
          setChamados(chamados);
          setCarregando(false);
      } catch (error) {
          console.error("Erro ao obter chamados: ", error);
      }
  };
    useEffect(() => {
      const recuperarChamados = async () => {
          try {
              const chamados = await ListarChamadosAtivos();
              setChamados(chamados);
              setCarregando(false);
              console.log(chamados);

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
          <Button title="atualizar" onPress={recuperarChamados2}/>
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
          <Button title="ver Chamados Finalizados"/>

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
