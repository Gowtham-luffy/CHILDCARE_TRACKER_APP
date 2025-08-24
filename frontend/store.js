import { create } from 'zustand';
import * as SQLite from 'expo-sqlite';
import * as Network from 'expo-network';
import { api } from './api';

const db = SQLite.openDatabase('childcare.db');

function initDb() {
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS queue (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, payload TEXT)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS growth (id INTEGER PRIMARY KEY AUTOINCREMENT, childId TEXT, date TEXT, heightCm REAL, weightKg REAL, headCircumference REAL)');
  });
}
initDb();

export const useStore = create((set, get) => ({
  token: null,
  user: null,
  children: [],
  setAuth: (token,user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
  fetchChildren: async () => {
    const { token } = get();
    const rows = await api('/children', 'GET', null, token);
    set({ children: rows });
  },
  recordGrowthOffline: (g) => {
    db.transaction(tx => tx.executeSql('INSERT INTO growth (childId,date,heightCm,weightKg,headCircumference) VALUES (?,?,?,?,?)',
      [g.childId, g.date, g.heightCm, g.weightKg, g.headCircumference]));
    db.transaction(tx => tx.executeSql('INSERT INTO queue (type,payload) VALUES (?,?)', ['growth', JSON.stringify(g)]));
  },
  trySync: async () => {
    const net = await Network.getNetworkStateAsync();
    if (!net.isConnected) return;
    const { token } = get();
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM queue', [], async (_, { rows }) => {
        const items = rows._array || [];
        if (items.length === 0) return;
        const growth = items.filter(i=>i.type==='growth').map(i=>JSON.parse(i.payload));
        try {
          await api('/sync/push', 'POST', { growth }, token);
          db.transaction(tx2 => tx2.executeSql('DELETE FROM queue'));
        } catch(e) { console.log('sync failed', e.message); }
      });
    });
  }
}));
