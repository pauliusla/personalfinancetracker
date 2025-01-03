import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Button} from 'react-native';
import {RootStackParamList} from '../common';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a homescreen test</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile', {userId: '1'})}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BarcodeScanner')}>
        <Text style={styles.buttonText}>Barcode scanner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});
