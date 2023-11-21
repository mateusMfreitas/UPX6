import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import InserirChamado from '../../componentes/inserirChamado'; 
import ListarChamadosAtivosUsuario from '../../componentes/listarChamadosAtivosUsuario';
import ItemUsuario from '../../componentes/itemUsuario';
import Item from '../../componentes/item';


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
    {carregando ? (
      <ActivityIndicator size='large' color='black'/>
    ) : (
      <FlatList 
        style={{ width: '90%' }}
        data={chamados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ItemUsuario navigation={navigation} item={item}/>}
      />
    )}

    {!showForm ? (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
          <Text style={styles.buttonText}>Inserir Chamado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleVerFinalizados}>
          <Text style={styles.buttonText}>Finalizados</Text>
        </TouchableOpacity>
    </View>
    ) : (
      <InserirChamado fecharFormulario={fecharFormulario} navigation={navigation} />
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
},
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
  },
  item: {
    backgroundColor: '#ADD8E6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1, 
    borderColor: '#000', 
    borderRadius: 5, 
  },
  label: {
    fontWeight: 'bold',
  },container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1, 
    backgroundColor: '#1e90ff', 
    margin: 6,
    padding: 10, 
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
    backgroundColor: '#f0f0f0',
    padding: 7, 
    width: '100%'
  }
});
