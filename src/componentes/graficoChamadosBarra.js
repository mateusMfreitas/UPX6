import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function GraficoChamadosBarra({ navigation }) {

    async function getChamados(){
        const chamadosCollection = collection(db, "chamados");
        const chamadosSnapshot = await getDocs(chamadosCollection);

        const responsavelCount = {};

        chamadosSnapshot.forEach(doc => {
            const responsavel = doc.data().responsavel;
            responsavelCount[responsavel] = (responsavelCount[responsavel] || 0) + 1;
          });
        
          return responsavelCount;
    }
    const [data, setData] = useState({});
    useEffect(() => {
        async function fetchData() {
            const chamadosData = await getChamados();
            setData(chamadosData);
        }
        fetchData();
        }, []);
    const responsaveis = Object.keys(data);
    const chamadosCounts = Object.values(data);

    return (
        <BarChart
          data={{
            labels: responsaveis,
            datasets: [{
              data: chamadosCounts
            }]
          }}
          
          width={Dimensions.get("window").width - 16}
          height={180}
          chartConfig={{
            fromZero: true,
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      );

}
