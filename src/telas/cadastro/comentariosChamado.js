import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';

export default function ComentariosChamado({ navigation, route }) {
    const [showForm, setShowForm] = useState(false);
    const { item } = route.params;

    const CommentBubble = ({ comentario }) => (
    <View style={styles.bubbleContainer}>
        <View style={styles.bubble}>
        <Text style={styles.texto}>{comentario}</Text>
        </View>
    </View>
    );


    return( 
    <View>
        <FlatList
        data={item.comentarios}
        renderItem={({ item }) => <CommentBubble comentario={item} />}
        keyExtractor={(item, index) => index.toString()}
    />

    </View>
    );
}
const styles = StyleSheet.create({
    bubbleContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
      },
    form: {
        width: '80%',
        alignItems: 'center'
    },
    texto: {
        alignItems: 'center'
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 5
    }
});