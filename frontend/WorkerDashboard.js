import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import { api } from '../api';
import { useStore } from '../store';

export default function WorkerDashboard({ navigation }) {
  const token = useStore(s=>s.token);
  const [children, setChildren] = useState([]);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [village, setVillage] = useState('');

  const load = async () => setChildren(await api('/children', 'GET', null, token));
  useEffect(()=>{ load(); },[]);

  const addChild = async () => {
    await api('/children','POST',{ name, dob, village }, token);
    setName(''); setDob(''); setVillage('');
    await load();
  };

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 22, marginBottom: 8 }}>Healthcare Worker Dashboard</Text>
      <View style={{ flexDirection:'row', marginBottom:8 }}>
        <TextInput placeholder="Child name" value={name} onChangeText={setName} style={{ borderWidth:1, padding:8, flex:1, marginRight:6 }} />
        <TextInput placeholder="DOB YYYY-MM-DD" value={dob} onChangeText={setDob} style={{ borderWidth:1, padding:8, flex:1, marginRight:6 }} />
        <TextInput placeholder="Village" value={village} onChangeText={setVillage} style={{ borderWidth:1, padding:8, flex:1, marginRight:6 }} />
        <Button title="Add" onPress={addChild} />
      </View>
      <FlatList data={children} keyExtractor={(i)=>i.id} renderItem={({item}) => (
        <View style={{ borderWidth:1, padding:8, marginBottom:6 }}>
          <Text>{item.name} - {item.village || '-'}</Text>
          <View style={{ flexDirection:'row', marginTop:6 }}>
            <Button title="Profile" onPress={()=>navigation.navigate('ChildProfile',{ child: item })} />
            <Button title="Vaccines" onPress={()=>navigation.navigate('Vaccinations',{ child: item })} />
            <Button title="Growth" onPress={()=>navigation.navigate('Growth',{ child: item })} />
          </View>
        </View>
      )} />
    </View>
  );
}
