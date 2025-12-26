import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const EquityCurve = ({ trades, initialCapital }) => {
  // On s'assure que initialCapital est un nombre, sinon par défaut 0
  const startBalance = parseFloat(initialCapital) || 0;
  let cumulativeBalance = startBalance;
  
  // On trie les trades par date et on calcule le solde cumulé
  const data = [...trades]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((trade, index) => {
      // Utilisation de profit$ (le champ de ton formulaire)
      cumulativeBalance += parseFloat(trade.profit$) || 0;
      return {
        name: `T${index + 1}`,
        balance: cumulativeBalance,
        date: new Date(trade.date).toLocaleDateString()
      };
    });

  // Le point de départ affiche maintenant ton capital initial
  const chartData = [{ name: 'Départ', balance: startBalance }, ...data];

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.05)', 
      padding: '1.5rem', 
      borderRadius: '0.75rem', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '2rem',
      height: '300px'
    }}>
      <h4 style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>Évolution du Capital ($)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            domain={['dataMin - 100', 'auto']} // Ajuste l'échelle pour ne pas coller au bord
            tickFormatter={(value) => `${value}$`} 
          />
          <Tooltip 
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#60a5fa' }}
            formatter={(value) => [`${value.toFixed(2)} $`, 'Solde']}
          />
          <Area 
            type="monotone" 
            dataKey="balance" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorBalance)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityCurve;