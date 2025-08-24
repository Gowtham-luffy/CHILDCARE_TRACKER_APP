import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { api } from '../api';
import { useStore } from '../store';

export default function Vaccinations({ route }) {
  const { child } = route.params;
  const token = useStore(s=>s.token);
  const [sched, setSched] = useState([]);
  const [given, setGiven] = useState([]);

  const load = async () => {
    const res = await api('/vaccinations/schedule/' + child.id, 'GET', null, token);
    setSched(res.schedule); setGiven(res.given);
  };

  useEffect(()=>{ load(); },[]);

  const mark = async (code) => {
    try {
      const today = new Date().toISOString().slice(0,10);
      await api('/vaccinations/mark','POST',{ childId: child.id, code, date: today }, token);
      await load();
    } catch(e) { Alert.alert('Error', e.message); }
  };

  const givenSet = new Set(given.map(g=>g.code));
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>Vaccination Schedule</Text>
      <FlatList data={sched} keyExtractor={(i)=>i.code}
        renderItem={({item}) => (
          <View style={{ borderWidth:1, padding:8, marginBottom:6 }}>
            <Text>{item.code}</Text>
            {givenSet.has(item.code) ? <Text>Given</Text> : <Button title="Mark Given" onPress={() => mark(item.code)} />}
          </View>
        )}
      />
    </View>
  );
}
