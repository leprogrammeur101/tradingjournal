import React, { useState, useEffect } from 'react';
import { Plus, FileText, BarChart3 } from 'lucide-react'; // Retrait de Wallet pour corriger l'erreur
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
  const [filterPair, setFilterPair] = useState('All'); 

  // GESTION DU CAPITAL
  const [initialCapital, setInitialCapital] = useState(10000);
  const [isEditingCap, setIsEditingCap] = useState(false);

  const userSuffix = user?.email ? user.email.replace(/[^a-zA-Z0-9]/g, '_') : 'guest';

  useEffect(() => {
    const savedMacros = localStorage.getItem(`macro_${userSuffix}`);
    const savedTrades = localStorage.getItem(`trades_${userSuffix}`);
    const savedCap = localStorage.getItem(`cap_${userSuffix}`);

    if (savedMacros) setMacroAnalyses(JSON.parse(savedMacros));
    if (savedTrades) setTrades(JSON.parse(savedTrades));
    if (savedCap) setInitialCapital(parseFloat(savedCap));
  }, [userSuffix]);

  const saveCapital = (val) => {
    const numVal = parseFloat(val) || 0;
    setInitialCapital(numVal);
    localStorage.setItem(`cap_${userSuffix}`, numVal);
    setIsEditingCap(false);
  };

  // LOGIQUE MACRO (Définition des fonctions manquantes)
  const saveMacro = (data) => {
    const newAnalyses = [{ ...data, id: Date.now(), date: new Date().toISOString() }, ...macroAnalyses];
    localStorage.setItem(`macro_${userSuffix}`, JSON.stringify(newAnalyses));
    setMacroAnalyses(newAnalyses);
    setShowMacroForm(false);
  };

  const deleteMacro = (id) => {
    const newAnalyses = macroAnalyses.filter(a => a.id !== id);
    localStorage.setItem(`macro_${userSuffix}`, JSON.stringify(newAnalyses));
    setMacroAnalyses(newAnalyses);
  };

  // ACTIONS TRADES
  const saveTrade = (data) => {
    const newTrades = [{ ...data, id: Date.now(), date: new Date().toISOString() }, ...trades];
    localStorage.setItem(`trades_${userSuffix}`, JSON.stringify(newTrades));
    setTrades(newTrades);
    setShowTradeForm(false);
  };

  const deleteTrade = (id) => {
    const newTrades = trades.filter(t => t.id !== id);
    localStorage.setItem(`trades_${userSuffix}`, JSON.stringify(newTrades));
    setTrades(newTrades);
  };

  // FILTRAGE ET CALCULS
  const totalProfit = trades.reduce((sum, t) => sum + (parseFloat(t.profit$) || 0), 0);
  const currentBalance = parseFloat(initialCapital) + totalProfit;
  
  const pairList = ['All', ...new Set(trades.map(t => t.pair?.toUpperCase()).filter(Boolean))];
  const filteredTrades = filterPair === 'All' ? trades : trades.filter(t => t.pair?.toUpperCase() === filterPair);

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(16px)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          📊 Mon Espace Trading
        </h2>

        {/* AFFICHAGE DU CAPITAL & SOLDE */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>CAPITAL INITIAL</p>
            {isEditingCap ? (
              <input 
                type="number" 
                defaultValue={initialCapital} 
                onBlur={(e) => saveCapital(e.target.value)} 
                autoFocus 
                style={{ background: '#0f172a', color: 'white', border: '1px solid #3b82f6', borderRadius: '4px', padding: '2px 5px' }}
              />
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

        {/* Navigation par onglets */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <button onClick={() => setActiveTab('macro')} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'macro' ? '2px solid #3b82f6' : 'none', color: activeTab === 'macro' ? '#60a5fa' : '#94a3b8', fontWeight: '600', cursor: 'pointer' }}>📈 Analyses Macro</button>
          <button onClick={() => setActiveTab('trades')} style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', borderBottom: activeTab === 'trades' ? '2px solid #3b82f6' : 'none', color: activeTab === 'trades' ? '#60a5fa' : '#94a3b8', fontWeight: '600', cursor: 'pointer' }}>💼 Journal de Trades</button>
        </div>

        {activeTab === 'macro' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem' }}>Mes Recherches Macro-économiques</h3>
              <button onClick={() => setShowMacroForm(true)} style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={18} /> Nouvelle Analyse</button>
            </div>
            {showMacroForm && <MacroForm onSave={saveMacro} onCancel={() => setShowMacroForm(false)} />}
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              {macroAnalyses.length === 0 ? <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}><FileText size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} /><p>Aucune analyse enregistrée.</p></div> : macroAnalyses.map(analysis => <MacroCard key={analysis.id} analysis={analysis} onDelete={deleteMacro} />)}
            </div>
          </div>
        )}

        {activeTab === 'trades' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <EquityCurve trades={filteredTrades} initialCapital={initialCapital} />
                <SessionAnalysis trades={filteredTrades} />
            </div>
            <TradingStats trades={filteredTrades} />
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
              <label style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Filtrer par actif :</label>
              <select value={filterPair} onChange={(e) => setFilterPair(e.target.value)} style={{ background: '#1e293b', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                {pairList.map(pair => <option key={pair} value={pair}>{pair}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem' }}>Mon Journal de Trading</h3>
              <button onClick={() => setShowTradeForm(true)} style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', background: '#10b981', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={18} /> Nouveau Trade</button>
            </div>
            {showTradeForm && <TradeForm onSave={saveTrade} onCancel={() => setShowTradeForm(false)} />}
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              {filteredTrades.length === 0 ? <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}><BarChart3 size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} /><p>Aucun trade trouvé.</p></div> : filteredTrades.map(trade => <TradeCard key={trade.id} trade={trade} onDelete={deleteTrade} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;