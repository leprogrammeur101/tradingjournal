import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const EquityCurve = ({ trades }) => {
  // Préparation des données : on part de 0 et on cumule les profits
  let cumulativeProfit = 0;
  
  // On trie les trades par date (du plus ancien au plus récent) pour la courbe
  const data = [...trades]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((trade, index) => {
      cumulativeProfit += parseFloat(trade.profit) || 0;
      return {
        name: `Trade ${index + 1}`,
        profit: cumulativeProfit,
        date: new Date(trade.date).toLocaleDateString()
      };
    });

  // Ajouter un point de départ à 0 si le journal est vide
  const chartData = [{ name: 'Départ', profit: 0 }, ...data];

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
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}$`} />
          <Tooltip 
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#60a5fa' }}
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorProfit)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityCurve;