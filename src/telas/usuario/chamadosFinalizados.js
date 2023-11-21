import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import InserirChamado from '../../componentes/inserirChamado'; 
import ListarChamadosAtivosUsuario from '../../componentes/listarChamadosAtivosUsuario';
import Item from '../../componentes/item';
import ListarChamadosFinalizadosUsuario from '../../componentes/listarChamadosFinalizadosUsuario';
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebaseConfig';



export default function ChamadosFinalizados({ navigation, route }) {    
    const [showForm, setShowForm] = useState(false);
    const [chamados, setChamados] = useState([]);
    const [atualizarChamados, setAtualizarChamados] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
      const recuperarChamados = async () => {
          try {
              const chamados = await ListarChamadosFinalizadosUsuario();
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

    const ListarChamadosFinalizadosUsuario = async () => {
      try {
          const auth = getAuth();
          const user = auth.currentUser;
          const q = query(collection(db, 'chamados'), 
          where('solicitante', '==', user.email),
          where('status', '==', 'finalizado'));
                  const chamadoSnapshot = await getDocs(q);
          const listaChamados = chamadoSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
          }));
          return listaChamados;
      } catch (error) {
          console.error("Erro ao listar chamados: ", error);
          throw error;
      }
  };
    const handleVerPendentes = async () =>{
        navigation.navigate('ListaChamados', {atualizarTudo: true});
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleVerPendentes}>
                    <Text style={styles.buttonText}>Pendentes</Text>
                </TouchableOpacity>
            </View>
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
