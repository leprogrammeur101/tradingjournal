import React, { useState } from 'react';
import { Save } from 'lucide-react';

const MacroForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    dxyDirection: '',
    pib: '',
    inflation: '',
    emploi: '',
    fedDecision: '',
    yields: '',
    sensFonda: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
      <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '1rem' }}>Nouvelle Analyse Macro</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Titre de l'analyse</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            placeholder="Ex: Analyse mensuelle Décembre 2025"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Direction DXY</label>
          <select
            value={formData.dxyDirection}
            onChange={(e) => setFormData({...formData, dxyDirection: e.target.value})}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          >
            <option value="">Sélectionner...</option>
            <option value="haussier">🟢 Haussier</option>
            <option value="baissier">🔴 Baissier</option>
            <option value="neutre">🟡 Neutre/Range</option>
          </select>
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>PIB (croissance %)</label>
          <input
            type="text"
            value={formData.pib}
            onChange={(e) => setFormData({...formData, pib: e.target.value})}
            placeholder="Ex: +2.1%"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Inflation CPI</label>
          <input
            type="text"
            value={formData.inflation}
            onChange={(e) => setFormData({...formData, inflation: e.target.value})}
            placeholder="Ex: 3.7% a/a"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Emploi (NFP/Chômage)</label>
          <input
            type="text"
            value={formData.emploi}
            onChange={(e) => setFormData({...formData, emploi: e.target.value})}
            placeholder="Ex: 250k emplois / 3.8%"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Décision FED</label>
          <select
            value={formData.fedDecision}
            onChange={(e) => setFormData({...formData, fedDecision: e.target.value})}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          >
            <option value="">Sélectionner...</option>
            <option value="hawkish">🦅 Hawkish (Hausse taux)</option>
            <option value="dovish">🕊️ Dovish (Baisse taux)</option>
            <option value="neutral">⚖️ Neutre (Maintien)</option>
          </select>
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>US10Y Yields</label>
          <input
            type="text"
            value={formData.yields}
            onChange={(e) => setFormData({...formData, yields: e.target.value})}
            placeholder="Ex: 4.25%"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Sens Fonda</label>
          <select
            value={formData.sensFonda}
            onChange={(e) => setFormData({...formData, sensFonda: e.target.value})}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.3)', background: 'rgba(15, 23, 42, 0.5)', color: 'white' }}
          >
            <option value="">Sélectionner...</option>
            <option value="bullish_usd">💪 Bullish USD</option>
            <option value="bearish_usd">📉 Bearish USD</option>
            <option value="neutre">➖ Neutre</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Notes & Analyse détaillée</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          rows={4}
          placeholder="Détaille ton analyse macro, les corrélations observées, contexte géopolitique, etc."
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
export default MacroForm;