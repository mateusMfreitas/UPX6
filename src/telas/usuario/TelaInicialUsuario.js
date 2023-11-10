import {SafeAreaView, StyleSheet, TextInput, Button, Alert, Text, View } from 'react-native';
import ListarChamadosDoUsuario from '../../componentes/listarChamadosDoUsuario';
import React, { useState, useEffect } from 'react';

export default function Chamados({ navigation }) {
  const [showForm, setShowForm] = useState(false);
  const [chamados, setChamados] = useState([]);
  const [atualizarChamados, setAtualizarChamados] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
      const recuperarChamados = async () => {
          try { 
              const chamados = await ListarChamadosDoUsuario();
              setChamados(chamados);
              setCarregando(false);

          } catch (error) {
              console.error("Erro ao obter chamados: ", error);
          }
      };

      recuperarChamados();
  }, [atualizarChamados]);

  const fecharFormulario = () => {
      setShowForm(false);
      setAtualizarChamados(prev => !prev);
  };
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,  
      width: 200,
      padding: 10,
    },  
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });