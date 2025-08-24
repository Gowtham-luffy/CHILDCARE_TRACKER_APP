import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useStore } from '../store';
import { api } from '../api';
import { useTranslation } from 'react-i18next';

export default function Login({ navigation }) {
  const { t, i18n } = useTranslation();
  const setAuth = useStore(s=>s.setAuth);
  const [email, setEmail] = useState('worker@example.com');
  const [password, setPassword] = useState('Pass@123');

  const onLogin = async () => {
    try {
      const { token, user } = await api('/auth/login','POST',{ email, password });
      setAuth(token, user);
      if (user.role === 'mother') navigation.replace('MotherDashboard');
      else if (user.role === 'worker') navigation.replace('WorkerDashboard');
      else navigation.replace('AdminDashboard');
    } catch(e) { Alert.alert('Error', e.message); }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24 }}>{t('login')}</Text>
      <Text>{t('email')}</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth:1, padding:8 }} />
      <Text>{t('password')}</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, padding:8 }} />
      <View style={{ flexDirection:'row', marginVertical: 8 }}>
        <Button title="EN" onPress={()=> i18n.changeLanguage('en')} />
        <Button title="TA" onPress={()=> i18n.changeLanguage('ta')} />
      </View>
      <Button title="Login" onPress={onLogin} />
    </View>
  );
}
