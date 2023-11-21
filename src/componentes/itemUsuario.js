import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
export default function ItemUsuario({ item, navigation, style }) {
    const verComentarios = () => {
        navigation.navigate('ComentariosChamado', { item: item });
    };
    return (
        <TouchableOpacity onPress={verComentarios}>
        <View style={styles.item}>
            <Text style={styles.nomeChamado}>{item.nome}</Text>
            <Text style={styles.descricaoChamado}>{item.descricao}</Text>
            <Text style={styles.dataChamado}>{formatIsoDate(item.dataAdicionado)}</Text>
            <Text style={styles.nomeChamado}>{item.responsavel}</Text>
            <Text style={styles.statusChamado}>{item.status}</Text>
        </View>
        </TouchableOpacity>
    );

}
function formatIsoDate(isoString) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const formattedDate = formatIsoDate("2023-09-22T12:34:56.789Z");

const styles = StyleSheet.create({
    productItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    nomeChamado: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descricaoProduto: {
        marginTop: 4,
        color: 'gray',
    },
    dataChamado: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusChamado: {
        marginTop: 4,
        color: 'green',
    },
      item: {
        backgroundColor: '#d3d3d3',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#000', 
        borderRadius: 5, 
      }
});