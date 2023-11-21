import { StyleSheet } from 'react-native';

export const estilosComuns = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderRadius: 10,
      width: 200,
      padding: 10,
    },
    button: {
      width: 210,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#007BFF',
      marginBottom: 12,
      alignSelf: 'center'
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
    },
    closeButton: {
      width: 210,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'red',
      marginBottom: 12,
      alignSelf: 'center'
    },
    deleteButton: {
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'red',
      marginBottom: 12,
      alignSelf: 'center'
    }
  });