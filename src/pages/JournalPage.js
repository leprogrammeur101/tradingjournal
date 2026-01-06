import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { db } from '../firebase'; // Import de ta config Firebase
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc, 
  updateDoc,
  setDoc
} from 'firebase/firestore';

import MacroForm from '../components/journal/MacroForm';
import MacroCard from '../components/journal/MacroCard';
import TradeForm from '../components/journal/TradeForm';
import TradeCard from '../components/journal/TradeCard';
import EquityCurve from '../components/journal/EquityCurve';
import TradingStats from '../components/journal/TradingStats';
import SessionAnalysis from '../components/journal/SessionAnalysis';

const JournalPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('macro');
  const [macroAnalyses, setMacroAnalyses] = useState([]);
  const [trades, setTrades] = useState([]);
  const [showMacroForm, setShowMacroForm] = useState(false);
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [filterPair, setFilterPair] = useState('all'); 
  const [initialCapital, setInitialCapital] = useState(10000);
  const [isEditingCap, setIsEditingCap] = useState(false);

  // --- 1. SYNC DES TRADES (Temps Réel) ---
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "trades"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrades(data);
    });
    return () => unsubscribe();
  }, [user]);

  // --- 2. SYNC DES MACROS (Temps Réel) ---
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "macros"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMacroAnalyses(data);
    });
    return () => unsubscribe();
  }, [user]);

  // --- 3. SYNC DU CAPITAL ---
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, "settings", user.uid), (doc) => {
      if (doc.exists()) setInitialCapital(doc.data().initialCapital);
    });
    return () => unsubscribe();
  }, [user]);

  const saveCapital = async (val) => {
    const numVal = parseFloat(val) || 0;
    try {
      await setDoc(doc(db, "settings", user.uid), { initialCapital: numVal }, { merge: true });
      setIsEditingCap(false);
    } catch (e) { console.error(e); }
  };

  // --- ACTIONS TRADES ---
  const saveTrade = async (data) => {
    try {
      const tradeData = {
        ...data,
        userId: user.uid,
        profit$: parseFloat(data.profit$) || 0,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
      };

      if (editingTrade?.id) {
        await updateDoc(doc(db, "trades", editingTrade.id), tradeData);
      } else {
        await addDoc(collection(db, "trades"), tradeData);
      }
      setShowTradeForm(false);
      setEditingTrade(null);
    } catch (e) { alert("Erreur de sauvegarde cloud"); }
  };

  const deleteTrade = async (id) => {
    if (window.confirm("Supprimer ce trade du cloud ?")) {
      await deleteDoc(doc(db, "trades", id));
    }
  };

  // --- ACTIONS MACRO ---
  const saveMacro = async (data) => {
    try {
      await addDoc(collection(db, "macros"), {
        ...data,
        userId: user.uid,
        date: new Date().toISOString()
      });
      setShowMacroForm(false);
    } catch (e) { console.error(e); }
  };

  const deleteMacro = async (id) => {
    if (window.confirm("Supprimer cette analyse ?")) {
      await deleteDoc(doc(db, "macros", id));
    }
  };

  // --- LOGIQUE FILTRAGE ---
  const getFilteredTrades = () => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return trades.filter(trade => {
      const tradeDate = new Date(trade.date);
      const matchPair = filterPair === 'all' || trade.pair === filterPair;
      let matchTime = true;
      if (timeFilter === 'today') matchTime = tradeDate >= startOfToday;
      else if (timeFilter === 'week') matchTime = tradeDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      else if (timeFilter === 'month') matchTime = tradeDate.getMonth() === now.getMonth() && tradeDate.getFullYear() === now.getFullYear();
      return matchPair && matchTime;
    });
  };

  const filteredTrades = getFilteredTrades();
  const totalProfit = trades.reduce((sum, t) => sum + (parseFloat(t.profit$) || 0), 0);
  const currentBalance = parseFloat(initialCapital) + totalProfit;
  const uniquePairs = ['all', ...new Set(trades.map(t => t.pair))];

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(16px)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📊 Espace Cloud Trading</h2>

        {/* CAPITAL SECTION */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>CAPITAL INITIAL (Cloud)</p>
            {isEditingCap ? (
              <input type="number" defaultValue={initialCapital} onBlur={(e) => saveCapital(e.target.value)} autoFocus style={{ background: '#0f172a', color: 'white', border: '1px solid #3b82f6', padding: '2px 5px' }} />
            ) : (
              <p onClick={() => setIsEditingCap(true)} style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer' }}>{initialCapital} $</p>
            )}
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>SOLDE ACTUEL</p>
            <p style={{ color: currentBalance >= initialCapital ? '#22c55e' : '#ef4444', fontSize: '1.25rem', fontWeight: 'bold' }}>{currentBalance.toFixed(2)} $</p>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <button onClick={() => setActiveTab('macro')} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'macro' ? '2px solid #3b82f6' : 'none', color: activeTab === 'macro' ? '#60a5fa' : '#94a3b8', cursor: 'pointer' }}>📈 Analyses Macro</button>
          <button onClick={() => setActiveTab('trades')} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'trades' ? '2px solid #3b82f6' : 'none', color: activeTab === 'trades' ? '#60a5fa' : '#94a3b8', cursor: 'pointer' }}>💼 Journal de Trades</button>
        </div>

        {activeTab === 'macro' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white' }}>Recherches Macro</h3>
              <button onClick={() => setShowMacroForm(true)} style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}><Plus size={18} /> Nouvelle Analyse</button>
            </div>
            {showMacroForm && <MacroForm onSave={saveMacro} onCancel={() => setShowMacroForm(false)} />}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {macroAnalyses.map(analysis => <MacroCard key={analysis.id} analysis={analysis} onDelete={deleteMacro} />)}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <EquityCurve trades={filteredTrades} initialCapital={initialCapital} />
                <SessionAnalysis trades={filteredTrades} />
            </div>
            <TradingStats trades={filteredTrades} />
            
            {/* FILTERS */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', background: 'rgba(30, 41, 59, 0.5)', padding: '0.3rem', borderRadius: '0.5rem' }}>
                {['all', 'month', 'week', 'today'].map(f => (
                  <button key={f} onClick={() => setTimeFilter(f)} style={{ padding: '0.4rem 1rem', border: 'none', borderRadius: '0.4rem', cursor: 'pointer', background: timeFilter === f ? '#3b82f6' : 'transparent', color: 'white' }}>{f}</button>
                ))}
              </div>
              <select value={filterPair} onChange={(e) => setFilterPair(e.target.value)} style={{ padding: '0.5rem', background: '#1e293b', color: 'white', borderRadius: '0.5rem' }}>
                {uniquePairs.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white' }}>Journal de Trading</h3>
              <button onClick={() => {setEditingTrade(null); setShowTradeForm(true);}} style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', background: '#10b981', color: 'white', border: 'none', cursor: 'pointer' }}><Plus size={18} /> Nouveau Trade</button>
            </div>

            {showTradeForm && <TradeForm onSave={saveTrade} onCancel={() => {setShowTradeForm(false); setEditingTrade(null);}} initialData={editingTrade} />}
            <div style={{ display: 'grid', gap: '1rem' }}>
              {filteredTrades.map(trade => (
                <TradeCard key={trade.id} trade={trade} onDelete={() => deleteTrade(trade.id)} onEdit={() => {setEditingTrade(trade); setShowTradeForm(true);}} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;