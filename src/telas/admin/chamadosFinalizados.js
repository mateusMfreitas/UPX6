import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';import ListarChamadosFinalizados from '../../componentes/listarChamadosFinalizados';
import Item from '../../componentes/item';
import { estilosComuns } from '../../estilo/estilosComuns'; 
import { StyleSheet } from 'react-native';



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
    <TouchableOpacity style={styles.button} onPress={handleVerPendentes}>
      <Text style={styles.buttonText}>Chamados Pendentes</Text>
    </TouchableOpacity>
  </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20, 
    },
    button: {
        width: 170, // Reduce the width
        height: 40, // Reduce the height
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        color: '#ffffff',
        marginTop: 20,
      }
  });
