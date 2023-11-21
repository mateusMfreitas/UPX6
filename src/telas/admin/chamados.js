import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import ListarChamadosAtivos from '../../componentes/listarChamadosAtivos';
import Item from '../../componentes/item';

export default function Chamados({ navigation, route }) {    
    const [showForm, setShowForm] = useState(false);
    const [chamados, setChamados] = useState([]);
    const [atualizarChamados, setAtualizarChamados] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
      const recuperarChamados = async () => {
          try {
              const chamados = await ListarChamadosAtivos();
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
                renderItem={({ item }) => <Item navigation={navigation} item={item}/>}
            />
            }
            <TouchableOpacity style={styles.button} onPress={handleVerFinalizados}>
                <Text style={styles.buttonText}>Chamados Finalizados</Text>
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
        width: 170,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        color: '#ffffff',
        marginTop: 20,
      }
  });
