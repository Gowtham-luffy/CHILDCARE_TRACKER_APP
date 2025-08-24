import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Login from './src/screens/Login';
import MotherDashboard from './src/screens/MotherDashboard';
import ChildProfile from './src/screens/ChildProfile';
import Vaccinations from './src/screens/Vaccinations';
import Growth from './src/screens/Growth';
import Appointments from './src/screens/Appointments';
import WorkerDashboard from './src/screens/WorkerDashboard';
import AdminDashboard from './src/screens/AdminDashboard';
import './src/i18n';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MotherDashboard" component={MotherDashboard} />
        <Stack.Screen name="ChildProfile" component={ChildProfile} />
        <Stack.Screen name="Vaccinations" component={Vaccinations} />
        <Stack.Screen name="Growth" component={Growth} />
        <Stack.Screen name="Appointments" component={Appointments} />
        <Stack.Screen name="WorkerDashboard" component={WorkerDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
