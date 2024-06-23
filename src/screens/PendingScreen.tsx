import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import moment from 'moment';
import { Data } from './types';

type PendingScreenRouteProp = RouteProp<RootStackParamList, 'Pending'>;

type Props = {
  route: PendingScreenRouteProp;
};


const PendingScreen = ({ route }: Props) => {
  const { data } = route.params;
  const currentMonth = moment();
  const [sortOption, setSortOption] = useState<string>('none');
  const [searchOption, setSearchOption] = useState<string>('GSTIN');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const calculateMonthsDifference = (dateString: string) => {
    const date = moment(dateString, 'DD-MM-YYYY');
    return currentMonth.diff(date, 'months');
  };

  const filteredData = () => {
    if (searchOption === 'GSTIN') {
      return data.filter((item: Data) => item.GSTIN.toString().includes(searchQuery));
    } else if (searchOption === 'name') {
      return data.filter((item: Data) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (searchOption === 'date') {
      const lastMonth = moment().subtract(1, 'month').format('MM-YYYY');
      const last3Months = moment().subtract(3, 'month').format('MM-YYYY');
      const last6Months = moment().subtract(6, 'month').format('MM-YYYY');
      
      switch (searchQuery) {
        case 'lastMonth':
          return data.filter((item: Data) =>
            moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === lastMonth ||
            moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === lastMonth
          );
        case 'last3Months':
          return data.filter((item: Data) =>
            moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === lastMonth ||
            moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === last3Months ||
            moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === lastMonth ||
            moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === last3Months
          );
        case 'last6Months':
          return data.filter((item: Data) =>
            moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === lastMonth ||
            moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === last3Months ||
            moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === last6Months ||
            moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === lastMonth ||
            moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === last3Months ||
            moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === last6Months
          );
        default:
          return [];
      }
    }
    return [];
  };

  const sortedData = [...filteredData()].sort((a, b) => {
    if (sortOption === 'months-gstr1') {
      return calculateMonthsDifference(a.gstr1) - calculateMonthsDifference(b.gstr1);
    } else if (sortOption === 'months-gstr3b') {
      return calculateMonthsDifference(a.gstr3b) - calculateMonthsDifference(b.gstr3b);
    } else {
      return 0;
    }
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>GSTIN</Text>
      <Text style={styles.headerText}>Name</Text>
      <Text style={styles.headerText}>GSTR1</Text>
      <Text style={styles.headerText}>GSTR3B</Text>
      <Text style={styles.headerText}>Status</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Data }) => {
    const isCurrentMonthGST1 = moment(item.gstr1, 'DD-MM-YYYY').format('MM-YYYY') === currentMonth.format('MM-YYYY');
    const isCurrentMonthGST3B = moment(item.gstr3b, 'DD-MM-YYYY').format('MM-YYYY') === currentMonth.format('MM-YYYY');
    
  
    return (
      <View style={styles.row}>
      <Text style={styles.cell}>{item.GSTIN}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <View style={[styles.cell, isCurrentMonthGST1 ? styles.greenBox : styles.redBox]}>
        <Text>{item.gstr1}</Text>
      </View>
      <View style={[styles.cell, isCurrentMonthGST3B ? styles.greenBox : styles.redBox]}>
        <Text>{item.gstr3b}</Text>
      </View>
      <Text style={styles.cell}>{item.status}</Text>
    </View>
    );
    };
    
    return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.sortContainer}>
          <Text>Sort by: </Text>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={(itemValue) => setSortOption(itemValue)}>
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Months-GSTR1" value="months-gstr1" />
            <Picker.Item label="Months-GSTR3B" value="months-gstr3b" />
          </Picker>
        </View>
        <View style={styles.searchContainer}>
          <Picker
            selectedValue={searchOption}
            style={styles.picker}
            onValueChange={(itemValue) => setSearchOption(itemValue)}>
            <Picker.Item label="Search by GSTIN" value="GSTIN" />
            <Picker.Item label="Search by Name" value="name" />
            <Picker.Item label="Search by Date" value="date" />
          </Picker>
          {searchOption === 'date' && (
            <Picker
              selectedValue={searchQuery}
              style={styles.picker}
              onValueChange={(itemValue) => setSearchQuery(itemValue)}>
                <Picker.Item label="None" value="None" />
              <Picker.Item label="Last Month" value="lastMonth" />
              <Picker.Item label="Last 3 Months" value="last3Months" />
              <Picker.Item label="Last 6 Months" value="last6Months" />
            </Picker>
          )}
          
          {(searchOption === 'GSTIN' || searchOption === 'name') && (
            <TextInput
            style={styles.searchInput}
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              placeholder={searchOption === 'GSTIN' ? "Enter GSTIN" : "Enter Name"}
            />
          )}
        </View>
        <FlatList 
          data={sortedData}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item) => item.GSTIN.toString()}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
    );
    };
    
    const styles = StyleSheet.create({
    scrollViewContainer: {
    flexGrow: 1,
    },
    container: {
    flex: 1,
    padding: 10,
    },
    sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    searchInput: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 8,
      marginRight: 10,
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
    greenBox: {
    backgroundColor: 'lightgreen',
    },
    redBox: {
    backgroundColor: 'lightcoral',
    },
    searchContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    },
    picker: {
      height: 50,
      width: '80%',
      marginRight: 10,
  
    }
    });
    
    export default PendingScreen;
    