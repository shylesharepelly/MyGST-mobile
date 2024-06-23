import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import moment from 'moment';
import { StackNavigationProp } from '@react-navigation/stack';
import { Data } from './types';

type ClientScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type ClientScreenRouteProp = RouteProp<RootStackParamList, 'Clients'>;

type Props = {
  navigation: ClientScreenNavigationProp;
  route: ClientScreenRouteProp;
};



const ClientScreen = ({ navigation, route }: Props) => {
  const { data } = route.params;
  const [searchType, setSearchType] = useState<string>('GSTIN');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('lastMonth');
  const [filteredData, setFilteredData] = useState<Data[]>(data);
 
  const handleSearch = () => {
    if (searchType === 'GSTIN') {
      const query = searchQuery.trim();
      if (query === '') {
        setFilteredData(data);
      } else {
        const filtered = data.filter(item => item.GSTIN.toString().includes(searchQuery));
        setFilteredData(filtered);
      }
    } else if (searchType === 'name') {
      const query = searchQuery.trim().toLowerCase();
      if (query === '') {
        setFilteredData(data);
      } else {
        const filtered = data.filter(item => item.name.toLowerCase().includes(query));
        setFilteredData(filtered);
      }
    } else if (searchType === 'date') {
      let startDate: moment.Moment;
      if (dateRange === 'lastMonth') {
        startDate = moment().subtract(1, 'months').startOf('month');
      } else if (dateRange === 'last3Months') {
        startDate = moment().subtract(3, 'months').startOf('month');
      } else {
        startDate = moment().subtract(6, 'months').startOf('month');
      }

      const filtered = data.filter(item => {
        const gst1Date = moment(item.gstr1, 'DD-MM-YYYY');
        const gst3bDate = moment(item.gstr3b, 'DD-MM-YYYY');
        return gst1Date.isAfter(startDate) || gst3bDate.isAfter(startDate);
      });

      setFilteredData(filtered);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>GSTIN</Text>
      <Text style={styles.headerText}>Name</Text>
      <Text style={styles.headerText}>GSTR1</Text>
      <Text style={styles.headerText}>GSTR3B</Text>
      <Text style={styles.headerText}>Status</Text>
    </View>
  );

  const handleAddClient = () => {
    navigation.navigate('AddClient');
  };

  const renderItem = ({ item }: { item: Data }) => {
    const currentMonth = moment().format('MM-YYYY');
    const gst1Date = moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY');
    const gst3bDate = moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY');

    const gst1Status = gst1Date === currentMonth ? 'filed' : 'pending';
    const gst3bStatus = gst3bDate === currentMonth ? 'filed' : 'pending';

    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item.GSTIN}</Text>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={[styles.cell, gst1Status === 'filed' ? styles.filed : styles.pending]}>
          {gst1Date}
        </Text>
        <Text style={[styles.cell, gst3bStatus === 'filed' ? styles.filed : styles.pending]}>
          {gst3bDate}
        </Text>
        <Text style={styles.cell}>{item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Picker
          selectedValue={searchType}
          style={styles.picker}
          onValueChange={(itemValue) => setSearchType(itemValue as string)}
        >
          <Picker.Item label="Search by GSTIN" value="GSTIN" />
          <Picker.Item label="Search by Name" value="name" />
          <Picker.Item label="Search by Date" value="date" />
        </Picker>
        {searchType === 'GSTIN' && (
          <TextInput
            style={styles.input}
            placeholder="Enter GSTIN to search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            keyboardType="numeric"
          />
        )}
        {searchType === 'name' && (
          <TextInput
            style={styles.input}
            placeholder="Enter Name to search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}
        {searchType === 'date' && (
          <Picker
            selectedValue={dateRange}
            style={styles.picker}
            onValueChange={(itemValue) => setDateRange(itemValue as string)}
          >
            <Picker.Item label="Last Month" value="lastMonth" />
            <Picker.Item label="Last 3 Months" value="last3Months" />
            <Picker.Item label="Last 6 Months" value="last6Months" />
          </Picker>
        )}
        <Button title="Search" onPress={handleSearch} />
        </View>
        <View>
        <Button title="Add Client" onPress={handleAddClient} />
      </View>
      <FlatList
        data={filteredData}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.GSTIN.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}  // Ensures the bottom items are accessible
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  filed: {
    color: 'green',
  },
  pending: {
    color: 'red',
  },
});

export default ClientScreen;
