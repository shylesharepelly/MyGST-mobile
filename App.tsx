import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ClientScreen from './src/screens/ClientScreen';
import FiledScreen from './src/screens/FiledScreen';
import PendingScreen from './src/screens/PendingScreen';
import AddClientScreen from './src/screens/AddClientScreen';
import { Data } from './src/screens/types';



export type RootStackParamList = {
  Home: { data: Data[] };
  Clients: { data: Data[] };
  Filed: { data: Data[] };
  Pending: { data: Data[] };
  AddClient : { data: Data[] };
};

const Stack = createStackNavigator<RootStackParamList>();

const sampleData = [
  {
    "GSTIN": 123123,
    "name": "Raju",
    "gstr1": "12-05-2024",
    "gstr3b": "13-04-2024",
    "status": "Active"
  },
  {
    "GSTIN": 456456,
    "name": "Amit",
    "gstr1": "15-06-2023",
    "gstr3b": "14-05-2023",
    "status": "Inactive"
  },
  {
    "GSTIN": 789789,
    "name": "Sunita",
    "gstr1": "20-04-2024",
    "gstr3b": "18-03-2024",
    "status": "Active"
  },
  {
    "GSTIN": 101112,
    "name": "Vijay",
    "gstr1": "25-08-2023",
    "gstr3b": "22-07-2023",
    "status": "Inactive"
  },
  {
    "GSTIN": 131415,
    "name": "Reena",
    "gstr1": "10-09-2023",
    "gstr3b": "08-08-2023",
    "status": "Active"
  },
  {
    "GSTIN": 161718,
    "name": "Anil",
    "gstr1": "05-10-2023",
    "gstr3b": "04-09-2023",
    "status": "Inactive"
  },
  {
    "GSTIN": 181920,
    "name": "Kavita",
    "gstr1": "15-11-2022",
    "gstr3b": "14-10-2022",
    "status": "Active"
  },
  {
    "GSTIN": 212223,
    "name": "Rohit",
    "gstr1": "20-12-2022",
    "gstr3b": "18-11-2022",
    "status": "Inactive"
  },
  {
    "GSTIN": 242526,
    "name": "Priya",
    "gstr1": "25-01-2024",
    "gstr3b": "22-12-2023",
    "status": "Active"
  },
  {
    "GSTIN": 272829,
    "name": "Arjun",
    "gstr1": "10-02-2024",
    "gstr3b": "08-01-2024",
    "status": "Inactive"
  },
  {
    "GSTIN": 303132,
    "name": "Nina",
    "gstr1": "05-03-2024",
    "gstr3b": "04-02-2024",
    "status": "Active"
  },
  {
    "GSTIN": 333435,
    "name": "Suresh",
    "gstr1": "12-04-2024",
    "gstr3b": "13-03-2024",
    "status": "Inactive"
  },
  {
    "GSTIN": 363738,
    "name": "Meena",
    "gstr1": "15-05-2024",
    "gstr3b": "14-04-2024",
    "status": "Active"
  },
  {
    "GSTIN": 394041,
    "name": "Deepak",
    "gstr1": "20-01-2024",
    "gstr3b": "18-05-2024",
    "status": "Inactive"
  },
  {
    "GSTIN": 424344,
    "name": "Geeta",
    "gstr1": "25-07-2023",
    "gstr3b": "22-02-2024",
    "status": "Active"
  },
  {
    "GSTIN": 454647,
    "name": "Vikas",
    "gstr1": "10-02-2023",
    "gstr3b": "08-03-2024",
    "status": "Inactive"
  }
]



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ data: sampleData }} />
        <Stack.Screen name="Clients" component={ClientScreen} />
        <Stack.Screen name="Filed" component={FiledScreen} />
        <Stack.Screen name="Pending" component={PendingScreen} />
        <Stack.Screen name="AddClient" component={AddClientScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
