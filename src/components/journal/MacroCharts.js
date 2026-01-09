import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MacroCharts = ({ data }) => {
  // On trie les données par date pour avoir une ligne chronologique
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '2rem' }}>
      <h4 style={{ color: '#60a5fa', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 'bold' }}>📈 ÉVOLUTION DES PILIERS MACRO</h4>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} />
            <Tooltip 
              contentStyle={{ background: '#0f172a', border: '1px solid #3b82f6', color: '#fff' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend />
            
            {/* Pilier 1: Inflation */}
            <Line yAxisId="left" type="monotone" dataKey="inflation" name="Inflation (%)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            
            {/* Pilier 2: PIB */}
            <Line yAxisId="left" type="monotone" dataKey="pib" name="PIB (%)" stroke="#22c55e" strokeWidth={2} />
            
            {/* Pilier 3: Taux (Yields) */}
            <Line yAxisId="left" type="monotone" dataKey="yields" name="Taux US10Y (%)" stroke="#eab308" strokeWidth={2} />
            
            {/* Pilier 4: Ton Sentiment Score */}
            <Line yAxisId="right" type="step" dataKey="sentimentScore" name="Ton Biais (-5 à +5)" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
        Ce graphique croise tes saisies d'indicateurs avec ton sentiment personnel pour identifier tes forces d'analyse.
      </p>
    </div>
  );
};

export default MacroCharts;