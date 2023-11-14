import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import InserirChamado from '../../componentes/inserirChamado'; 
import ListarChamadosAtivosUsuario from '../../componentes/listarChamadosAtivosUsuario';
import ItemUsuario from '../../componentes/itemUsuario';




export default function Chamados({ navigation, route }) {    
    const [showForm, setShowForm] = useState(false);
    const [chamados, setChamados] = useState([]);
    const [atualizarChamados, setAtualizarChamados] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
      const recuperarChamados = async () => {
          try {
              const chamados = await ListarChamadosAtivosUsuario();
              setChamados(chamados);
              setCarregando(false);
              fecharFormulario();
              navigation.navigate('ListaChamados', { atualizarTudo: false });
          } catch (error) {
              console.error("Erro ao obter chamados: ", error);
          }
      };

      recuperarChamados();
  },  [route.params?.atualizarTudo]);
    const fecharFormulario = () => {
        setShowForm(false);
    };
    const handleVerFinalizados = async () => {
      navigation.navigate('ListaChamadosFinalizados', {atualizarTudo: true})
    }
    return (
        <View style={styles.container}>
          {carregando ? 
          <ActivityIndicator size='large' color='black'/>
          :
          <FlatList 
            data={chamados}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ItemUsuario navigation={navigation} item={item}/>}
          />
          }
          {!showForm ? (
            <Button title="Inserir Chamado" onPress={() => setShowForm(true)} />
          ) : (
            <InserirChamado fecharFormulario={fecharFormulario} navigation={navigation} />
          )}
          <Button title="ver Chamados Finalizados" onPress={handleVerFinalizados}/>

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
