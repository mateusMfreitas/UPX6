import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function GraficoChamadosResolvidos({ navigation }) {

    async function getChamados(){
        const chamadosCollection = collection(db, "chamados");
        const chamadosSnapshot = await getDocs(chamadosCollection);

        const statusCount = {
          'Finalizado': 0,
          'Não Finalizado': 0
        };

        chamadosSnapshot.forEach(doc => {
          const isFinalizado = doc.data().status === 'finalizado';
          const key = isFinalizado ? 'Finalizado' : 'Não Finalizado';  // Ou use qualquer outra lógica de categorização que você quiser
          statusCount[key] = (statusCount[key] || 0) + 1;
      });
        
          return statusCount;
    }
    const [data, setData] = useState({});
    useEffect(() => {
      async function fetchData() {
        const chamadosData = await getChamados();
        setData(chamadosData);
    }
        fetchData();
        }, []);
    const statusLabels = Object.keys(data);
    const chamadosCounts = Object.values(data);

    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10 }}>
              Chamados Resolvidos
        </Text>
        <BarChart
          data={{
            labels: statusLabels,
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
