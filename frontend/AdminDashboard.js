import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { api } from '../api';
import { useStore } from '../store';

export default function AdminDashboard() {
  const token = useStore(s=>s.token);
  const [rep, setRep] = useState(null);
  useEffect(()=>{ (async()=> setRep(await api('/admin/reports/coverage','GET',null,token)))(); },[]);
  if (!rep) return <View style={{ padding: 12 }}><Text>Loading...</Text></View>;
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 22, marginBottom: 8 }}>Admin Dashboard</Text>
      <Text>Total children: {rep.totalChildren}</Text>
      <Text>Total doses given: {rep.totalDosesGiven}</Text>
      <Text>Avg doses per child: {rep.avgDosesPerChild.toFixed(2)}</Text>
    </View>
  );
}
