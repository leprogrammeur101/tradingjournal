import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const MacroCard = ({ analysis, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const getDirectionColor = (direction) => {
    if (direction === 'haussier') return '#22c55e';
    if (direction === 'baissier') return '#ef4444';
    return '#eab308';
  };

  const getDirectionIcon = (direction) => {
    if (direction === 'haussier') return '🟢';
    if (direction === 'baissier') return '🔴';
    return '🟡';
  };

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(71, 85, 105, 0.5)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem', marginBottom: '0.5rem' }}>{analysis.title}</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
            {new Date(analysis.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ 
            padding: '0.375rem 0.75rem', 
            borderRadius: '0.375rem', 
            background: `${getDirectionColor(analysis.dxyDirection)}20`,
            color: getDirectionColor(analysis.dxyDirection),
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {getDirectionIcon(analysis.dxyDirection)} DXY {analysis.dxyDirection}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#60a5fa' }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        {analysis.pib && (
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>PIB</p>
            <p style={{ color: '#60a5fa', fontWeight: '600' }}>{analysis.pib}</p>
          </div>
        )}
        {analysis.inflation && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Inflation</p>
            <p style={{ color: '#f87171', fontWeight: '600' }}>{analysis.inflation}</p>
          </div>
        )}
        {analysis.emploi && (
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Emploi</p>
            <p style={{ color: '#4ade80', fontWeight: '600' }}>{analysis.emploi}</p>
          </div>
        )}
        {analysis.yields && (
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Yields 10Y</p>
            <p style={{ color: '#c084fc', fontWeight: '600' }}>{analysis.yields}</p>
          </div>
        )}
      </div>

      {expanded && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(71, 85, 105, 0.5)' }}>
          {analysis.fedDecision && (
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Décision FED: </span>
              <span style={{ color: 'white', fontWeight: '600' }}>
                {analysis.fedDecision === 'hawkish' && '🦅 Hawkish'}
                {analysis.fedDecision === 'dovish' && '🕊️ Dovish'}
                {analysis.fedDecision === 'neutral' && '⚖️ Neutre'}
              </span>
            </div>
          )}
          {analysis.sensFonda && (
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Sens Fonda: </span>
              <span style={{ 
                color: analysis.sensFonda === 'bullish_usd' ? '#22c55e' : analysis.sensFonda === 'bearish_usd' ? '#ef4444' : '#eab308', 
                fontWeight: '600' 
              }}>
                {analysis.sensFonda === 'bullish_usd' && '💪 Bullish USD'}
                {analysis.sensFonda === 'bearish_usd' && '📉 Bearish USD'}
                {analysis.sensFonda === 'neutre' && '➖ Neutre'}
              </span>
            </div>
          )}
          {analysis.notes && (
            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: '0.5rem', marginTop: '0.75rem' }}>
              <p style={{ color: '#cbd5e1', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>{analysis.notes}</p>
            </div>
          )}
          <button
            onClick={() => onDelete(analysis.id)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#f87171',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            🗑️ Supprimer
          </button>
        </div>
      )}
    </div>
  );
};
export default MacroCard;
