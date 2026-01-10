import React, { useState } from 'react';
import { Save } from 'lucide-react';

const MacroForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    currency: 'USD',
    dxyDirection: 'Neutral', 
    pib: '',
    inflation: '',
    emploi: '',      
    fedDecision: '', 
    interestRate: '', // Changement : On passe de yields à interestRate
    sentimentScore: 0,
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      pib: parseFloat(formData.pib) || 0,
      inflation: parseFloat(formData.inflation) || 0,
      interestRate: parseFloat(formData.interestRate) || 0, // Nouveau champ numérique
      emploi: parseFloat(formData.emploi) || 0,
      sentimentScore: parseInt(formData.sentimentScore)
    };
    onSave(dataToSave);
  };

  const labelStyle = { color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' };
  const inputStyle = { width: '100%', padding: '0.7rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(30, 41, 59, 0.7)', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.4)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>🧠 Analyse des données </h4>
        <input 
          type="date" 
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          style={{ background: 'rgba(15, 23, 42, 0.5)', color: '#60a5fa', border: '1px solid #3b82f6', borderRadius: '0.5rem', padding: '0.3rem 0.7rem' }}
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {/* TITRE ET DEVISE */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 2 }}>
            <label style={labelStyle}>Titre de la session</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required placeholder="Ex: Analyse Post-FOMC" style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Devise Focus</label>
            <select value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})} style={inputStyle}>
              <option value="USD">USD (FED)</option>
              <option value="EUR">EUR (BCE)</option>
              <option value="GBP">GBP (BoE)</option>
              <option value="JPY">JPY (BoJ)</option>
            </select>
          </div>
        </div>

        {/* LES 4 PILIERS RÉELS */}
        <div>
          <label style={labelStyle}>Inflation CPI (%)</label>
          <input type="number" step="0.1" value={formData.inflation} onChange={(e) => setFormData({...formData, inflation: e.target.value})} placeholder="Ex: 3.1" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>PIB Croissance (%)</label>
          <input type="number" step="0.1" value={formData.pib} onChange={(e) => setFormData({...formData, pib: e.target.value})} placeholder="Ex: 2.4" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Chômage / Emploi (%)</label>
          <input type="number" step="0.1" value={formData.emploi} onChange={(e) => setFormData({...formData, emploi: e.target.value})} placeholder="Ex: 3.9" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Taux d'intérêt (%)</label>
          <input type="number" step="0.01" value={formData.interestRate} onChange={(e) => setFormData({...formData, interestRate: e.target.value})} placeholder="Ex: 5.50" style={inputStyle} />
        </div>

        {/* DIRECTION ET SENTIMENT */}
        <div style={{ gridColumn: '1 / span 2' }}>
          <label style={labelStyle}>Narratif Banque Centrale</label>
          <input type="text" value={formData.fedDecision} onChange={(e) => setFormData({...formData, fedDecision: e.target.value})} placeholder="Ex: Pause hawkish, réduction du bilan" style={inputStyle} />
        </div>
        <div style={{ gridColumn: '3 / span 1' }}>
          <label style={labelStyle}>Tendance Dollar</label>
          <select value={formData.dxyDirection} onChange={(e) => setFormData({...formData, dxyDirection: e.target.value})} style={inputStyle}>
            <option value="Bullish">Bullish ↑</option>
            <option value="Neutral">Neutral ↔</option>
            <option value="Bearish">Bearish ↓</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1', background: 'rgba(15, 23, 42, 0.4)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Sentiment Score (Biais)</label>
            <span style={{ fontWeight: 'bold', color: formData.sentimentScore > 0 ? '#22c55e' : formData.sentimentScore < 0 ? '#ef4444' : '#94a3b8' }}>
              {formData.sentimentScore > 0 ? `Bullish (+${formData.sentimentScore})` : formData.sentimentScore < 0 ? `Bearish (${formData.sentimentScore})` : 'Neutre'}
            </span>
          </div>
          <input type="range" min="-5" max="5" step="1" value={formData.sentimentScore} onChange={(e) => setFormData({...formData, sentimentScore: e.target.value})} style={{ width: '100%', cursor: 'pointer', accentColor: formData.sentimentScore > 0 ? '#22c55e' : '#ef4444' }} />
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <label style={labelStyle}>Notes Stratégiques</label>
        <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows={3} placeholder="Impact des taux sur la devise focus..." style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button type="submit" style={{ flex: 1, padding: '0.8rem', borderRadius: '0.5rem', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Save size={18} /> Sauvegarder l'Analyse
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '0.8rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #334155', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}>Annuler</button>
      </div>
    </form>
  );
};

export default MacroForm;