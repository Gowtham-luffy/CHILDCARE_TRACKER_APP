import React from 'react';
import { View, Text } from 'react-native';

export default function ChildProfile({ route }) {
  const { child } = route.params;
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22 }}>{child.name}</Text>
      <Text>DOB: {child.dob}</Text>
      <Text>Gender: {child.gender || '-'}</Text>
      <Text>Village: {child.village || '-'}</Text>
    </View>
  );
}
