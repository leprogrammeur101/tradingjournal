import React, { useState, useEffect} from 'react';
import { Save } from 'lucide-react';

const TradeForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    pair: '',
    direction: '',
    entry: '',
    sl: '',
    tp: '',
    rr: '',
    result: '',
    profit$: '', 
    contextMacro: '',
    setup: '',
    notes: '',
    screenshotUrl: '',
    date: new Date().toISOString().slice(0, 16)
  });
// Calcul automatique du Risk:Reward
 // Calcul automatique du Risk:Reward corrigé
useEffect(() => {
  // On remplace les virgules par des points pour autoriser les deux saisies
  const cleanEntry = formData.entry.toString().replace(',', '.');
  const cleanSl = formData.sl.toString().replace(',', '.');
  const cleanTp = formData.tp.toString().replace(',', '.');

  const e = parseFloat(cleanEntry);
  const s = parseFloat(cleanSl);
  const t = parseFloat(cleanTp);

  if (!isNaN(e) && !isNaN(s) && !isNaN(t) && e !== s) {
    const risk = Math.abs(e - s);
    const reward = Math.abs(t - e);
    const ratio = (reward / risk).toFixed(2);
    const newRR = `1:${ratio}`;

    if (formData.rr !== newRR) {
      setFormData(prev => ({ ...prev, rr: newRR }));
    }
  }
}, [formData.entry, formData.rr, formData.sl, formData.tp]);

// AUTOMATISATION : Résultat en fonction du profit saisi
useEffect(() => {
  const val = parseFloat(formData.profit$);
  if (!isNaN(val)) {
    let newResult = 'be';
    if (val > 5) newResult = 'win';
    else if (val < -5) newResult = 'loss';

    if (formData.result !== newResult) {
      setFormData(prev => ({ ...prev, result: newResult }));
    }
  }
}, [formData.profit$, formData.result]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value // Met à jour dynamiquement le champ correspondant au "name" de l'input
    });
  };
  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
    <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Nouveau Trade</h4>
    
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        Date et Heure du Trade
      </label>
      <input 
        type="datetime-local" // Permet de choisir le jour et l'heure précise
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        style={{
          width: '100%',
          padding: '0.75rem',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '0.5rem',
          color: 'white',
          outline: 'none'
        }}
      />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      {/* Session */}
      <div>
        <label style={{ color: '#cbd5e1', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Session</label>
        <select 
          value={formData.session || ''}
          onChange={(e) => setFormData({...formData, session: e.target.value})}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', background: 'rgba(15, 23, 42, 0.5)', color: 'white', border: '1px solid rgba(59, 130, 246, 0.3)' }}
        >
          <option value="">Sélectionner...</option>
          <option value="Asie">🌏 Asie (Tokyo/Sydney)</option>
          <option value="Londres">🇪🇺 Londres (Matin)</option>
          <option value="New York">🇺🇸 New York (Après-midi)</option>
          <option value="Overlap">⚡ Overlap (LDN/NY)</option>
        </select>
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Paire</label>
          <select
            value={formData.pair}
            onChange={(e) => setFormData({...formData, pair: e.target.value})}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          >
            <option value="">Sélectionner...</option>
            <option value="EURUSD">EUR/USD</option>
            <option value="GBPUSD">GBP/USD</option>
            <option value="USDJPY">USD/JPY</option>
            <option value="XAUUSD">XAU/USD (Or)</option>
            <option value="USDCHF">USDCHF</option>
            <option value="AUDUSD">AUDUSD</option>
            <option value="USDCAD">USDCAD</option>
            <option value="GBPJPY">GBPJPY</option>
            <option value="EURJPY">EURJPY</option>
            <option value="EURAUD">EURAUD</option>
            <option value="EURCHF">EURCHF</option>
            <option value="NZDCAD">NZDCAD</option>

          </select>
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Direction</label>
          <select
            value={formData.direction}
            onChange={(e) => setFormData({...formData, direction: e.target.value})}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          >
            <option value="">Sélectionner...</option>
            <option value="buy">🟢 BUY</option>
            <option value="sell">🔴 SELL</option>
          </select>
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Entrée</label>
          <input
            type="text"
            value={formData.entry}
            onChange={(e) => setFormData({...formData, entry: e.target.value})}
            required
            placeholder="Ex: 1.0850"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Stop Loss</label>
          <input
            type="text"
            value={formData.sl}
            onChange={(e) => setFormData({...formData, sl: e.target.value})}
            placeholder="Ex: 1.0820"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Take Profit</label>
          <input
            type="text"
            value={formData.tp}
            onChange={(e) => setFormData({...formData, tp: e.target.value})}
            placeholder="Ex: 1.0920"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Risk:Reward</label>
          <input
            type="text"
            value={formData.rr}
            readOnly
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Résultat (Auto)</label>
          <select name="result" value={formData.result} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}>
            <option value="win">✅ Win</option>
            <option value="loss">❌ Loss</option>
            <option value="be">➖ Break Even</option>
          </select>
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Gain/Perte net ($)</label>
          <input 
            type="number" 
            value={formData.profit$} 
            onChange={(e) => setFormData({...formData, profit$: e.target.value})} 
            placeholder="Ex: 200 ou -100" 
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            URL du Screenshot (TradingView / Image)
          </label>
          <input 
            type="text"
            name="screenshotUrl"
            value={formData.screenshotUrl || ''}
            onChange={handleChange}
            placeholder="https://www.tradingview.com/x/..."
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '0.5rem',
              color: 'white'
            }}
          />
        </div>
        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Contexte Macro</label>
          <select
            value={formData.contextMacro}
            onChange={(e) => setFormData({...formData, contextMacro: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          >
            <option value="">Sélectionner...</option>
            <option value="bullish_usd">💪 Bullish USD</option>
            <option value="bearish_usd">📉 Bearish USD</option>
            <option value="risk_on">🟢 Risk-On</option>
            <option value="risk_off">🔴 Risk-Off</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Setup Technique</label>
        <input
          type="text"
          value={formData.setup}
          onChange={(e) => setFormData({...formData, setup: e.target.value})}
          placeholder="Ex: FVG H4 + liquidité prise + DXY casse HH"
          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Notes & Émotions</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={3}
          placeholder="Comment tu te sentais ? Pourquoi as-tu pris ce trade ? Leçons apprises..."
          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white', resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: '#22c55e',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Save size={18} />
          Sauvegarder
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            background: 'transparent',
            color: '#f87171',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
export default TradeForm;