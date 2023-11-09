import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../../firebaseConfig';


const chamados = [];

async function getMeusChamados(){
  const user = getAuth().currentUser;
  const q = query(collection(db, "chamados"), where("responsavel", "==", user.email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    chamados.push(doc.data());
  });
  console.log(chamados);
}

const renderItem = ({ item }) => (
  <View>
    <Text>{item.nome}</Text>
    <Text>{item.descricao}</Text>

  </View>
);
export default function ADashboard({ navigation }) {
  useEffect(() => {
    getMeusChamados();
  }, []); 
 return( 
  <View style={styles.container}>
    <FlatList
      data={chamados}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
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
});
