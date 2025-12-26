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
    notes: ''
  });
// Calcul automatique du Risk:Reward
  useEffect(() => {
    const entry = parseFloat(formData.entry);
    const sl = parseFloat(formData.sl);
    const tp = parseFloat(formData.tp);

    if (entry && sl && tp) {
      const risk = Math.abs(entry - sl);
      const reward = Math.abs(tp - entry);
      
      if (risk !== 0) {
        const ratio = (reward / risk).toFixed(2);
        setFormData(prev => ({ ...prev, rr: `1:${ratio}` }));
      }
    }
  }, [formData.entry, formData.sl, formData.tp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
      <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Nouveau Trade</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
        <div>
        <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.5rem' }}>Session</label>
        <select 
            value={formData.session}
            onChange={(e) => setFormData({...formData, session: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(15, 23, 42, 0.5)', color: 'white', border: '1px solid rgba(59, 130, 246, 0.3)' }}
        >
            <option value="Asie">🌏 Asie (Tokyo/Sydney)</option>
            <option value="Londres">🇪🇺 Londres (Matin)</option>
            <option value="New York">🇺🇸 New York (Après-midi)</option>
            <option value="Overlap">⚡ Overlap (LDN/NY)</option>
        </select>
        </div>
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
            <option value="DXY">DXY</option>
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
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Résultat</label>
          <select
            value={formData.result}
            onChange={(e) => setFormData({...formData, result: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          >
            <option value="">En cours...</option>
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