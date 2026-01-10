import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Trash2, Info } from 'lucide-react';

const MacroCard = ({ analysis, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  // Gestion des couleurs pour le DXY et le Sentiment
  const getDirectionColor = (direction) => {
    const d = direction?.toLowerCase();
    if (d === 'bullish' || d === 'haussier') return '#22c55e';
    if (d === 'bearish' || d === 'baissier') return '#ef4444';
    return '#eab308';
  };

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(71, 85, 105, 0.5)', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem', marginBottom: '0.5rem' }}>{analysis.title}</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
            {new Date(analysis.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
            <span style={{ marginLeft: '10px', color: '#60a5fa' }}>• Focus {analysis.currency}</span>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            padding: '0.375rem 0.75rem', 
            borderRadius: '0.375rem', 
            background: `${getDirectionColor(analysis.dxyDirection)}20`,
            color: getDirectionColor(analysis.dxyDirection),
            fontSize: '0.875rem',
            fontWeight: '600',
            border: `1px solid ${getDirectionColor(analysis.dxyDirection)}40`
          }}>
            DXY: {analysis.dxyDirection}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#60a5fa' }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* GRILLE DES 4 PILIERS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>PIB</p>
          <p style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '1.1rem' }}>{analysis.pib}%</p>
        </div>
        
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>Inflation</p>
          <p style={{ color: '#f87171', fontWeight: 'bold', fontSize: '1.1rem' }}>{analysis.inflation}%</p>
        </div>

        <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>Emploi</p>
          <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1.1rem' }}>{analysis.emploi}%</p>
        </div>

        {/* AJOUT DES TAUX D'INTÉRÊT (Remplacement de yields) */}
        <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase' }}>Taux</p>
          <p style={{ color: '#facc15', fontWeight: 'bold', fontSize: '1.1rem' }}>{analysis.interestRate}%</p>
        </div>
      </div>

      {/* SECTION ÉTENDUE */}
      {expanded && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(71, 85, 105, 0.5)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Décision / Narratif Centrale:</p>
              <p style={{ color: 'white', fontSize: '0.95rem' }}>{analysis.fedDecision || "Non renseigné"}</p>
            </div>
            <div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Score de Sentiment:</p>
              <span style={{ 
                color: analysis.sentimentScore > 0 ? '#22c55e' : analysis.sentimentScore < 0 ? '#ef4444' : '#94a3b8',
                fontWeight: 'bold'
              }}>
                {analysis.sentimentScore > 0 ? `BULLISH (+${analysis.sentimentScore})` : analysis.sentimentScore < 0 ? `BEARISH (${analysis.sentimentScore})` : 'NEUTRE'}
              </span>
            </div>
          </div>

          {analysis.notes && (
            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Info size={12} /> NOTES STRATÉGIQUES
              </p>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>"{analysis.notes}"</p>
            </div>
          )}

          <button
            onClick={() => onDelete(analysis.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#f87171',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Trash2 size={14} /> Supprimer l'analyse
          </button>
        </div>
      )}
    </div>
  );
};

export default MacroCard;