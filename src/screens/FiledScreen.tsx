import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import moment from 'moment';
import { Data } from './types';

type FiledScreenRouteProp = RouteProp<RootStackParamList, 'Filed'>;

type Props = {
  route: FiledScreenRouteProp;
};


const FiledScreen = ({ route }: Props) => {
  const { data } = route.params;
  const currentMonth = moment().format('MM-YYYY');
  const [searchType, setSearchType] = useState<string>('GSTIN');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const currentMonthData = data.filter((item: Data) =>
    moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === currentMonth ||
    moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === currentMonth
  );
  const [filteredData, setFilteredData] = useState<Data[]>(currentMonthData);

  const handleSearch = () => {
    if (searchQuery) {
      if (searchType === 'GSTIN') {
        const filtered = currentMonthData.filter((item: Data) =>
          item.GSTIN.toString().includes(searchQuery)
        );
        setFilteredData(filtered);
      } else if (searchType === 'name') {
        const filtered = currentMonthData.filter((item: Data) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      }
    } else {
      setFilteredData(currentMonthData);
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

  const renderItem = ({ item }: { item: Data }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.GSTIN}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{moment(item.gstr1, 'DD-MM-YYYY').subtract(1, 'months').format('MMMM')}</Text>
      <Text style={styles.cell}>{moment(item.gstr3b, 'DD-MM-YYYY').subtract(1, 'months').format('MMMM')}</Text>
      <Text style={styles.cell}>{item.status}</Text>
    </View>
  );

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
        </Picker>
        <TextInput
          style={styles.searchInput}
          placeholder={`Enter ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={filteredData}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.GSTIN.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  picker: {
    height: 50,
    width: 150,
    marginRight: 10,
  },
});

export default FiledScreen;
