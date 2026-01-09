import React, { useState } from 'react';
import { Save } from 'lucide-react';

const MacroForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    currency: 'USD', // Pour filtrer les graphiques par devise plus tard
    dxyDirection: '',
    pib: '',         // On stockera juste le chiffre (ex: 2.1)
    inflation: '',   // On stockera juste le chiffre (ex: 3.1)
    emploi: '',      
    fedDecision: '',
    yields: '',
    sentimentScore: 0, // Nouveau: -5 (Très Bearish) à +5 (Très Bullish)
    sensFonda: '',
    notes: '',
    date: new Date().toISOString().split('T')[0] // Date de l'analyse
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Conversion des données en nombres pour les graphiques futurs
    const dataToSave = {
      ...formData,
      pib: parseFloat(formData.pib) || 0,
      inflation: parseFloat(formData.inflation) || 0,
      yields: parseFloat(formData.yields) || 0,
      sentimentScore: parseInt(formData.sentimentScore)
    };
    onSave(dataToSave);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.4)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>🧠 Analyse Fondamentale Structurée</h4>
        <input 
          type="date" 
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          style={{ background: 'rgba(15, 23, 42, 0.5)', color: '#60a5fa', border: '1px solid #3b82f6', borderRadius: '0.5rem', padding: '0.3rem 0.7rem' }}
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {/* Titre et Devise */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 2 }}>
            <label style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Titre de la session</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              placeholder="Ex: Analyse Post-NFP Décembre"
              style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Devise Focus</label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({...formData, currency: e.target.value})}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
            >
              <option value="USD">USD (DXY)</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>

        {/* Indicateurs Numériques (Pour les graphiques) */}
        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Inflation CPI (%)</label>
          <input
            type="number" step="0.1"
            value={formData.inflation}
            onChange={(e) => setFormData({...formData, inflation: e.target.value})}
            placeholder="Ex: 3.1"
            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>PIB Croissance (%)</label>
          <input
            type="number" step="0.1"
            value={formData.pib}
            onChange={(e) => setFormData({...formData, pib: e.target.value})}
            placeholder="Ex: 2.4"
            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>US10Y Yields (%)</label>
          <input
            type="number" step="0.01"
            value={formData.yields}
            onChange={(e) => setFormData({...formData, yields: e.target.value})}
            placeholder="Ex: 4.22"
            style={{ width: '100%', padding: '0.6rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
          />
        </div>

        {/* Sentiment Slider */}
        <div style={{ gridColumn: '1 / -1', background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Sentiment Global (Biais)</label>
            <span style={{ 
              fontWeight: 'bold', 
              color: formData.sentimentScore > 0 ? '#22c55e' : formData.sentimentScore < 0 ? '#ef4444' : '#94a3b8' 
            }}>
              {formData.sentimentScore > 0 ? `Bullish (+${formData.sentimentScore})` : formData.sentimentScore < 0 ? `Bearish (${formData.sentimentScore})` : 'Neutre'}
            </span>
          </div>
          <input
            type="range" min="-5" max="5" step="1"
            value={formData.sentimentScore}
            onChange={(e) => setFormData({...formData, sentimentScore: e.target.value})}
            style={{ width: '100%', cursor: 'pointer', accentColor: formData.sentimentScore > 0 ? '#22c55e' : '#ef4444' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginTop: '0.3rem' }}>
            <span>TRÈS BEARISH</span>
            <span>NEUTRE</span>
            <span>TRÈS BULLISH</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div style={{ marginTop: '1.5rem' }}>
        <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Notes & Narratif du Marché</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={3}
          placeholder="Pourquoi ce biais ? Quelle est l'histoire racontée par le marché actuellement ?"
          style={{ width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white', resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="submit" style={{ flex: 1, padding: '0.8rem', borderRadius: '0.5rem', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Save size={18} /> Enregistrer l'analyse
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '0.8rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #334155', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default MacroForm;