import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Data } from './types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen = ({ navigation, route }: Props) => {
  const { data } = route.params;


return (
  <View style={styles.container}>
    <View style={styles.buttonContainer}>
      <Button
        title="Total Clients"
        onPress={() => navigation.navigate('Clients', { data })}
        color="#1E90FF"
      />
    </View>
    <View style={styles.buttonContainer}>
      <Button
        title="Filed"
        onPress={() => navigation.navigate('Filed', { data })}
        color="#32CD32"
      /> 
    </View>
    <View style={styles.buttonContainer}>
      <Button
        title="Pending"
        onPress={() => navigation.navigate('Pending', { data })}
        color="#FF4500"
      />
    </View>
    
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
},
buttonContainer: {
  marginVertical: 8,
  width: '100%',
  paddingHorizontal: 16,
},
});

export default HomeScreen;
