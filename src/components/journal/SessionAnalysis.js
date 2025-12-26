import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const SessionAnalysis = ({ trades }) => {
  // Calculer les profits par session
  const sessionData = trades.reduce((acc, t) => {
    // On récupère la session ou 'Inconnue'
    const session = t.session || 'Inconnue';
    if (!acc[session]) acc[session] = 0;
    
    // CORRECTION ICI : Utilisation de profit$ au lieu de profit
    acc[session] += parseFloat(t.profit$) || 0;
    return acc;
  }, {});

  // Transformation des données pour le graphique
  const data = Object.entries(sessionData).map(([name, profit]) => ({
    name,
    profit: parseFloat(profit.toFixed(2))
  }));

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.05)', 
      padding: '1.5rem', 
      borderRadius: '0.75rem', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      height: '300px',
      marginTop: '0px' // Aligné avec l'Equity Curve
    }}>
      <h4 style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>Performance par Session</h4>
      
      {data.length === 0 ? (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
          En attente de données...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val}$`} 
            />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ fontWeight: 'bold' }}
              formatter={(value) => [`${value}$`, 'Profit/Perte']}
            />
            <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SessionAnalysis;