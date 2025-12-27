import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const TradeCard = ({ trade, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const getResultColor = (result) => {
    if (result === 'win') return '#22c55e';
    if (result === 'loss') return '#ef4444';
    if (result === 'be') return '#eab308';
    return '#94a3b8';
  };

  const getResultIcon = (result) => {
    if (result === 'win') return '✅ Victory';
    if (result === 'loss') return '❌ Perte';
    if (result === 'be') return '➖ B.E';
    return '⏳ En cours';
  };

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(71, 85, 105, 0.5)', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h4 style={{ color: 'white', fontWeight: '600', fontSize: '1.125rem' }}>{trade.pair}</h4>
            <span style={{ 
              padding: '0.25rem 0.75rem', 
              borderRadius: '0.375rem', 
              background: trade.direction === 'buy' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: trade.direction === 'buy' ? '#4ade80' : '#f87171',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              {trade.direction === 'buy' ? '🟢 ACHETER' : '🔴 VENDRE'}
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
            {new Date(trade.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Affichage du Profit Net sur la carte */}
          <span style={{ color: parseFloat(trade.profit$) >= 0 ? '#22c55e' : '#ef4444', fontWeight: 'bold', marginRight: '10px' }}>
            {parseFloat(trade.profit$) > 0 ? '+' : ''}{trade.profit$}$
          </span>

          <span style={{ 
            padding: '0.375rem 0.75rem', 
            borderRadius: '0.375rem', 
            background: `${getResultColor(trade.result)}20`,
            color: getResultColor(trade.result),
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {getResultIcon(trade.result)}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#60a5fa' }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem', borderRadius: '0.375rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Entrée</p>
          <p style={{ color: '#60a5fa', fontWeight: '600' }}>{trade.entry}</p>
        </div>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '0.375rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Stop Loss</p>
          <p style={{ color: '#f87171', fontWeight: '600' }}>{trade.sl}</p>
        </div>
        <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.5rem', borderRadius: '0.375rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Profitez (TP)</p>
          <p style={{ color: '#4ade80', fontWeight: '600' }}>{trade.tp}</p>
        </div>
        {/* Affichage du R:R */}
        <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '0.5rem', borderRadius: '0.375rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>R:R Ratio</p>
          <p style={{ color: '#c084fc', fontWeight: '600' }}>{trade.rr || '1:0'}</p>
        </div>
      </div>

      {trade.screenshotUrl && (
        <div style={{ marginTop: '1rem', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <a href={trade.screenshotUrl} target="_blank" rel="noopener noreferrer">
            <img 
              src={trade.screenshotUrl} 
              alt="Trade Setup" 
              style={{ 
                width: '100%', 
                maxHeight: '200px', 
                objectFit: 'cover', 
                display: 'block',
                cursor: 'zoom-in',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = 0.8}
              onMouseOut={(e) => e.currentTarget.style.opacity = 1}
            />
          </a>
          <div style={{ padding: '0.5rem', background: 'rgba(0,0,0,0.2)', fontSize: '0.75rem', textAlign: 'center', color: '#64748b' }}>
            Cliquez sur l'image pour l'agrandir
          </div>
        </div>
      )}

      {expanded && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(71, 85, 105, 0.5)' }}>
          {trade.setup && (
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Stratégie: </span>
              <span style={{ color: '#cbd5e1' }}>{trade.setup}</span>
            </div>
          )}
          {trade.notes && (
            <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: '0.5rem' }}>
              <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>{trade.notes}</p>
            </div>
          )}
          <button onClick={() => onDelete(trade.id)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem' }}>
            🗑️ Supprimer le trade
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeCard;