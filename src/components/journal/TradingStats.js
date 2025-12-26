import React from 'react';
import { TrendingUp, Target, BarChart2, DollarSign } from 'lucide-react';

const TradingStats = ({ trades }) => {
  // --- CALCULS CORRIGÉS ---
  const totalTrades = trades.length;

  // Win Rate : On vérifie "win" en minuscule et on utilise profit$
  const wins = trades.filter(t => 
    t.result === 'win' || 
    t.result === 'Win' || 
    parseFloat(t.profit$) > 0
  ).length;
  
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : "0.0";
  
  // Profit Total : Utilisation du champ profit$
  const totalProfit = trades.reduce((acc, t) => acc + (parseFloat(t.profit$) || 0), 0);

  // R/R Moyen : On extrait le chiffre après le ":" (ex: "1:2.5" -> 2.5)
  // Dans TradingStats.js, remplace le bloc de calcul avgRR par celui-ci :
const totalRRValue = trades.reduce((acc, t) => {
  if (!t.rr || !t.rr.includes(':')) return acc;
  
  // On récupère uniquement le chiffre après les ":"
  const parts = t.rr.split(':');
  const val = parseFloat(parts[1]);
  
  return acc + (isNaN(val) ? 0 : val);
}, 0);

const avgRR = totalTrades > 0 ? (totalRRValue / totalTrades).toFixed(2) : "0.00";

  const stats = [
    { label: 'Total Trades', value: totalTrades, icon: <BarChart2 size={20} />, color: '#94a3b8' },
    { label: 'Taux de victoire', value: `${winRate}%`, icon: <Target size={20} />, color: '#10b981' },
    { label: 'Profit Total', value: `${totalProfit.toFixed(2)}$`, icon: <DollarSign size={20} />, color: totalProfit >= 0 ? '#10b981' : '#ef4444' },
    { label: 'R/R Moyen', value: `1:${avgRR}`, icon: <TrendingUp size={20} />, color: '#3b82f6' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      {stats.map((stat, index) => (
        <div key={index} style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          padding: '1.5rem', 
          borderRadius: '0.75rem', 
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ color: stat.color, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
            {stat.icon} {stat.label}
          </div>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default TradingStats;