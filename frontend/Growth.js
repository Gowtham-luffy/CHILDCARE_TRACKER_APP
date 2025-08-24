import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useStore } from '../store';
import { api } from '../api';

export default function Growth({ route }) {
  const { child } = route.params;
  const token = useStore(s=>s.token);
  const recordGrowthOffline = useStore(s=>s.recordGrowthOffline);
  const trySync = useStore(s=>s.trySync);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [records, setRecords] = useState([]);

  const load = async () => {
    const rows = await api('/growth/child/' + child.id, 'GET', null, token);
    setRecords(rows);
  };

  useEffect(()=>{ load(); },[]);

  const add = async () => {
    const g = { childId: child.id, date: new Date().toISOString().slice(0,10), heightCm: parseFloat(height), weightKg: parseFloat(weight) };
    try {
      recordGrowthOffline(g);
      Alert.alert('Saved locally', 'Will sync when online.');
      setHeight(''); setWeight('');
      await trySync();
      await load();
    } catch(e) { Alert.alert('Error', e.message); }
  };

  const screenWidth = Dimensions.get('window').width - 24;
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>Growth</Text>
      <View style={{ flexDirection:'row' }}>
        <TextInput placeholder="Height cm" value={height} onChangeText={setHeight} keyboardType="numeric" style={{ borderWidth:1, padding:8, flex:1, marginRight:6 }} />
        <TextInput placeholder="Weight kg" value={weight} onChangeText={setWeight} keyboardType="numeric" style={{ borderWidth:1, padding:8, flex:1, marginRight:6 }} />
        <Button title="Add" onPress={add} />
      </View>
      {records.length>0 && (
        <LineChart
          data={{
            labels: records.map(r=>r.date.slice(5)),
            datasets: [{ data: records.map(r=>r.weightKg||0) }]
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix="kg"
          chartConfig={{ decimalPlaces: 1 }}
        />
      )}
    </View>
  );
}
