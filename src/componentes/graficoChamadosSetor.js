import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';
import { encode as btoa } from 'base-64';

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

    const exportToExcel = async () => {
      const dataToExport = setores.map((setor, index) => ({
        Setor: setor,
        Chamados: chamadosCounts[index],
      }));
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    
      const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
      const base64 = btoa(wbout);
      const uri = FileSystem.documentDirectory + 'data.xlsx';
      await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
      if (!(await Sharing.isAvailableAsync())) {
        alert(`Uh oh, sharing isn't available on your platform`);
        return;
      }
      Sharing.shareAsync(uri);
    };

    return (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10 }}>
            Chamados Por Setor
          </Text>
          <TouchableOpacity onPress={exportToExcel} style={{ backgroundColor: '#ddd', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'blue' }}>Exportar</Text>
          </TouchableOpacity>
        </View>
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
