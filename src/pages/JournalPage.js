import React, { useState, useEffect } from 'react';
import { Plus, FileText, BarChart3 } from 'lucide-react';
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
  const [filterPair, setFilterPair] = useState('All'); // Nouvel état pour le filtre

  // Extraire la liste unique des paires pour le menu déroulant
  const pairList = ['All', ...new Set(trades.map(t => t.pair?.toUpperCase()).filter(Boolean))];

  // Filtrer les trades pour l'affichage et les calculs
  const filteredTrades = filterPair === 'All' 
    ? trades 
    : trades.filter(t => t.pair?.toUpperCase() === filterPair);

  // Clé unique pour l'utilisateur actuel
  const userSuffix = user?.email ? user.email.replace(/[^a-zA-Z0-9]/g, '_') : 'guest';

  // --- CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    const savedMacros = localStorage.getItem(`macro_${userSuffix}`);
    const savedTrades = localStorage.getItem(`trades_${userSuffix}`);

    if (savedMacros) {
      try {
        setMacroAnalyses(JSON.parse(savedMacros));
      } catch (e) { console.error("Erreur lecture macros", e); }
    }

    if (savedTrades) {
      try {
        setTrades(JSON.parse(savedTrades));
      } catch (e) { console.error("Erreur lecture trades", e); }
    }
  }, [userSuffix]);

  // --- ACTIONS MACRO ---
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

  // --- ACTIONS TRADES ---
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

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1rem' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(16px)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          📊 Mon Espace Trading
        </h2>

        {/* Navigation par onglets */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <button
            onClick={() => setActiveTab('macro')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'macro' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'macro' ? '#60a5fa' : '#94a3b8',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            📈 Analyses Macro
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'trades' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'trades' ? '#60a5fa' : '#94a3b8',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            💼 Journal de Trades
          </button>
        </div>

        {/* Contenu de l'onglet Macro */}
        {activeTab === 'macro' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem' }}>Mes Recherches Macro-économiques</h3>
              <button
                onClick={() => setShowMacroForm(true)}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={18} /> Nouvelle Analyse
              </button>
            </div>

            {showMacroForm && <MacroForm onSave={saveMacro} onCancel={() => setShowMacroForm(false)} />}

            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              {macroAnalyses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  <FileText size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>Aucune analyse enregistrée.</p>
                </div>
              ) : (
                macroAnalyses.map(analysis => (
                  <MacroCard key={analysis.id} analysis={analysis} onDelete={deleteMacro} />
                ))
              )}
            </div>
          </div>
        )}

        {/* Contenu de l'onglet Trades */}
        {activeTab === 'trades' && (
          <div>
            {trades.length > 0 && <EquityCurve trades={trades} />}
            <TradingStats trades={trades} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <EquityCurve trades={filteredTrades} />
                <SessionAnalysis trades={filteredTrades} />
            </div>
    
    <TradingStats trades={filteredTrades} />
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Filtrer par actif :</label>
            <select 
                value={filterPair}
                onChange={(e) => setFilterPair(e.target.value)}
                style={{ 
                background: '#1e293b', 
                color: 'white', 
                border: '1px solid rgba(255,255,255,0.1)', 
                padding: '0.5rem', 
                borderRadius: '0.5rem',
                outline: 'none'
                }}
            >
                {pairList.map(pair => <option key={pair} value={pair}>{pair}</option>)}
            </select>
            </div>

            {/* On passe filteredTrades aux composants de stats et graphique */}
            {filteredTrades.length > 0 && <EquityCurve trades={filteredTrades} />}
            <TradingStats trades={filteredTrades} />

            {/* Liste des trades filtrée */}
            <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredTrades.map(trade => (
                <TradeCard key={trade.id} trade={trade} onDelete={deleteTrade} />
            ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.25rem' }}>Mon Journal de Trading</h3>
              <button
                onClick={() => setShowTradeForm(true)}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '0.5rem', background: '#10b981', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={18} /> Nouveau Trade
              </button>
            </div>

            {showTradeForm && <TradeForm onSave={saveTrade} onCancel={() => setShowTradeForm(false)} />}
            
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              {trades.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  <BarChart3 size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>Aucun trade dans le journal.</p>
                </div>
              ) : (
                trades.map(trade => (
                  <TradeCard key={trade.id} trade={trade} onDelete={deleteTrade} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;