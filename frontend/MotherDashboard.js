import React, { useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useStore } from '../store';
import { useIsFocused } from '@react-navigation/native';

export default function MotherDashboard({ navigation }) {
  const children = useStore(s=>s.children);
  const fetchChildren = useStore(s=>s.fetchChildren);
  const isFocused = useIsFocused();
  useEffect(()=>{ if(isFocused) fetchChildren(); },[isFocused]);

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 22, marginBottom: 8 }}>Mother Dashboard</Text>
      <FlatList data={children} keyExtractor={(item)=>item.id}
        renderItem={({item}) => (
          <View style={{ borderWidth:1, padding:8, marginBottom:8 }}>
            <Text>{item.name} - {item.village || '-'}</Text>
            <View style={{ flexDirection:'row', marginTop:6 }}>
              <Button title="Profile" onPress={()=>navigation.navigate('ChildProfile', { child: item })} />
              <Button title="Vaccines" onPress={()=>navigation.navigate('Vaccinations', { child: item })} />
              <Button title="Growth" onPress={()=>navigation.navigate('Growth', { child: item })} />
              <Button title="Appts" onPress={()=>navigation.navigate('Appointments', { child: item })} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
