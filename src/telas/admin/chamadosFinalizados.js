import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import ListarChamadosFinalizados from '../../componentes/listarChamadosFinalizados';
import Item from '../../componentes/item';

export default function ChamadosFinalizados({ navigation, route }) {    
    const [showForm, setShowForm] = useState(false);
    const [chamados, setChamados] = useState([]);
    const [atualizarChamados, setAtualizarChamados] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
      const recuperarChamados = async () => {
          try {
              const chamados = await ListarChamadosFinalizados();
              setChamados(chamados);
              setCarregando(false);
              fecharFormulario();
              navigation.navigate('ListaChamadosFinalizados', { atualizarTudo: false });
          } catch (error) {
              console.error("Erro ao obter chamados: ", error);
          }
      };

      recuperarChamados();
  },  [route.params?.atualizarTudo]);
    const fecharFormulario = () => {
        setShowForm(false);
    };
    const handleVerPendentes = async () => {
        navigation.navigate('ListaChamados', {atualizarTudo: true})
      }
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
          <Button title="ver Chamados Pendentes" onPress={handleVerPendentes}/>

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
