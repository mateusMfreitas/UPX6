import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function GraficoChamadosSetor({ navigation }) {

    async function getChamados(){
        const chamadosCollection = collection(db, "chamados");
        const chamadosSnapshot = await getDocs(chamadosCollection);

        const setorCount = {};

        chamadosSnapshot.forEach(doc => {
            const setor = doc.data().setor;
            setorCount[setor] = (setorCount[setor] || 0) + 1;
          });
        
          return setorCount;
    }
    const [data, setData] = useState({});
    useEffect(() => {
        async function fetchData() {
            const chamadosData = await getChamados();
            setData(chamadosData);
        }
        fetchData();
        }, []);
    const setores = Object.keys(data);
    const chamadosCounts = Object.values(data);

    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10 }}>
              Chamados por setor
        </Text>
        <BarChart
          data={{
            labels: setores,
            datasets: [{
              data: chamadosCounts
            }]
          }}
          xLabelsAngle={-45}
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
      </View>
      );

}
