import React from 'react';
// Ajout de ReferenceLine et Label dans les imports
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine, Label } from 'recharts';

const EquityCurve = ({ trades, initialCapital, propFirmConfig }) => {
  const startBalance = parseFloat(initialCapital) || 0;
  let cumulativeBalance = startBalance;
  
  const data = [...trades]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((trade, index) => {
      cumulativeBalance += parseFloat(trade.profit$) || 0;
      return {
        name: `T${index + 1}`,
        balance: cumulativeBalance,
        date: new Date(trade.date).toLocaleDateString()
      };
    });

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
            domain={['auto', 'auto']} 
            tickFormatter={(value) => `${value}$`} 
          />
          <Tooltip 
            contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#60a5fa' }}
            formatter={(value) => [`${value.toFixed(2)} $`, 'Solde']}
          />

          {/* --- MODIFICATION : LIGNES PROP FIRM --- */}
          {propFirmConfig?.isActive && (
            <>
              {/* Ligne d'Objectif */}
              {propFirmConfig.target && (
                <ReferenceLine 
                  y={startBalance + parseFloat(propFirmConfig.target)} 
                  stroke="#10b981" 
                  strokeDasharray="5 5" 
                  strokeWidth={2}
                >
                  <Label value="TARGET" position="right" fill="#10b981" fontSize={10} fontWeight="bold" />
                </ReferenceLine>
              )}

              {/* Ligne de Perte Maximale */}
              {propFirmConfig.maxDrawdown && (
                <ReferenceLine 
                  y={startBalance - parseFloat(propFirmConfig.maxDrawdown)} 
                  stroke="#ef4444" 
                  strokeDasharray="5 5" 
                  strokeWidth={2}
                >
                  <Label value="MAX LOSS" position="right" fill="#ef4444" fontSize={10} fontWeight="bold" />
                </ReferenceLine>
              )}
            </>
          )}

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