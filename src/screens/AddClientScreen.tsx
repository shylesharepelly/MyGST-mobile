import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Data } from './types';

const AddClientScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="GSTIN" />
      <Button title="Fetch" onPress={() => {}} />
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="GSTR1" />
      <TextInput style={styles.input} placeholder="GSTR3B" />
      <TextInput style={styles.input} placeholder="Status" />
      <Button title="Submit" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default AddClientScreen;
