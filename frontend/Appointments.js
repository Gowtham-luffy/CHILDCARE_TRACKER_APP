import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { api } from '../api';
import { useStore } from '../store';

export default function Appointments({ route }) {
  const { child } = route.params;
  const token = useStore(s=>s.token);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [rows, setRows] = useState([]);
  const load = async () => setRows(await api('/appointments/' + child.id, 'GET', null, token));

  useEffect(()=>{ load(); },[]);

  const add = async () => {
    try {
      await api('/appointments','POST',{ childId: child.id, date, location }, token);
      setDate(''); setLocation('');
      await load();
    } catch(e) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>Appointments</Text>
      <View style={{ flexDirection:'row' }}>
        <TextInput placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} style={{ borderWidth:1, padding:8, flex:1, marginRight:6 }} />
        <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={{ borderWidth:1, padding:8, flex:1, marginRight:6 }} />
        <Button title="Add" onPress={add} />
      </View>
      <FlatList data={rows} keyExtractor={(i)=>String(i.id)} renderItem={({item}) => (
        <View style={{ borderWidth:1, padding:8, marginTop:6 }}>
          <Text>{item.date} - {item.location || '-'}</Text>
        </View>
      )} />
    </View>
  );
}
