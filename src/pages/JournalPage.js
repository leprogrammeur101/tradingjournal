import React, { useState, useEffect } from 'react';
import { Plus, FileText, BarChart3 } from 'lucide-react'; // Retrait de Wallet pour corriger l'erreur
import MacroForm from '../components/journal/MacroForm';
import MacroCard from '../components/journal/MacroCard';
import TradeForm from '../components/journal/TradeForm';
import TradeCard from '../components/journal/TradeCard';
import EquityCurve from '../components/journal/EquityCurve';
import TradingStats from '../components/journal/TradingStats';
import SessionAnalysis from '../components/journal/SessionAnalysis';
import { db } from '../firebase'; // Assurez-vous que le chemin est correct
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

const JournalPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('macro');
  const [macroAnalyses, setMacroAnalyses] = useState([]);
  const [trades, setTrades] = useState([]);
  const [showMacroForm, setShowMacroForm] = useState(false);
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [filterPair, setFilterPair] = useState('All'); 

  // GESTION DU CAPITAL
  const [initialCapital, setInitialCapital] = useState(10000);
  const [isEditingCap, setIsEditingCap] = useState(false);


  // --- LOGIQUE DE RÉCUPÉRATION CLOUD (Remplace LocalStorage) ---
  // --- LOGIQUE DE RÉCUPÉRATION CLOUD EN TEMPS RÉEL ---
  useEffect(() => {
    if (!user) return;

    // Écoute des Trades
    const qTrades = query(
      collection(db, "trades"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    // Écoute des Analyses Macro
    const qMacros = query(
      collection(db, "macros"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribeTrades = onSnapshot(qTrades, (snapshot) => {
      setTrades(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubscribeMacros = onSnapshot(qMacros, (snapshot) => {
      setMacroAnalyses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeTrades();
      unsubscribeMacros();
    };
  }, [user]);


// --- LOGIQUE D'ENREGISTREMENT DANS LA BASE DE DONNÉES ---
  const saveTrade = async (data) => {
    try {
      const tradeDate = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
      
      const newTrade = { 
        ...data, 
        userId: user.uid, // Très important pour la synchronisation
        date: tradeDate,
        profit$: parseFloat(data.profit$) || 0,
        createdAt: new Date()
      };

      // Envoi à Firestore
      await addDoc(collection(db, "trades"), newTrade);
      
      setShowTradeForm(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du trade:", error);
      alert("Erreur de connexion à la base de données");
    }
  };
  
  const saveCapital = (val) => {
    const numVal = parseFloat(val) || 0;
    setInitialCapital(numVal);
    setIsEditingCap(false);
  };

  // LOGIQUE MACRO (Définition des fonctions manquantes)
  const saveMacro = (data) => {
    const newAnalyses = [{ ...data, id: Date.now(), date: new Date().toISOString() }, ...macroAnalyses];
    setMacroAnalyses(newAnalyses);
    setShowMacroForm(false);
  };

  const deleteMacro = async (id) => {
    if (window.confirm("Supprimer cette analyse macro ?")) {
      try {
        // Suppression directe dans Firestore
        await deleteDoc(doc(db, "macros", id));
      } catch (error) {
        console.error("Erreur suppression macro:", error);
      }
    }
  };


  const deleteTrade = async (id) => {
    if (window.confirm("Supprimer ce trade définitivement ?")) {
      try {
        await deleteDoc(doc(db, "trades", id));
      } catch (error) {
        console.error("Erreur suppression:", error);
      }
    }
  };

  // FILTRAGE ET CALCULS
  const totalProfit = trades.reduce((sum, t) => sum + (parseFloat(t.profit$) || 0), 0);
  const currentBalance = parseFloat(initialCapital) + totalProfit;
  
  const getFilteredTrades = () => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return trades.filter(trade => {
      const tradeDate = new Date(trade.date);
      
      // 1. Filtre par Paire
      const matchPair = filterPair === 'all' || trade.pair === filterPair;

      // 2. Filtre par Temps
      let matchTime = true;
      if (timeFilter === 'today') {
        matchTime = tradeDate >= startOfToday;
      } else if (timeFilter === 'week') {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchTime = tradeDate >= oneWeekAgo;
      } else if (timeFilter === 'month') {
        matchTime = tradeDate.getMonth() === now.getMonth() && 
                    tradeDate.getFullYear() === now.getFullYear();
      }

      // Le trade doit valider les DEUX conditions
      return matchPair && matchTime;
    });
  };

  const filteredTrades = getFilteredTrades();
  
  // Extraire la liste unique des paires présentes dans tes trades pour le menu déroulant
  const uniquePairs = ['all', ...new Set(trades.map(t => t.pair))];

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
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              
              {/* Filtre Temporel (Pills) */}
              <div style={{ display: 'flex', background: 'rgba(30, 41, 59, 0.5)', padding: '0.3rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                {[
                  { id: 'all', label: 'Tout' },
                  { id: 'month', label: 'Mois' },
                  { id: 'week', label: 'Semaine' },
                  { id: 'today', label: 'Aujourd\'hui' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeFilter(t.id)}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '0.4rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      background: timeFilter === t.id ? '#3b82f6' : 'transparent',
                      color: timeFilter === t.id ? 'white' : '#94a3b8',
                      transition: '0.2s'
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Filtre par Paire (Dropdown) */}
              <select 
                value={filterPair}
                onChange={(e) => setFilterPair(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#1e293b',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              >
                {uniquePairs.map(pair => (
                  <option key={pair} value={pair}>
                    {pair === 'all' ? 'Toutes les paires' : pair}
                  </option>
                ))}
              </select>
              
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                {filteredTrades.length} trade(s) trouvé(s)
              </span>
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