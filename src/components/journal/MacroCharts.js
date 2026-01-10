import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MacroCharts = ({ data }) => {
  // On trie les données par date pour avoir une ligne chronologique propre
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '2rem' }}>
      <h4 style={{ color: '#60a5fa', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 'bold' }}>📈 ÉVOLUTION DES 4 PILIERS MACRO</h4>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8" 
              fontSize={11} 
              tickFormatter={(str) => new Date(str).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
            />
            
            {/* Axe Gauche pour les pourcentages (0% à 10%+) */}
            <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} unit="%" />
            
            {/* Axe Droite spécifique pour le Sentiment Score (-5 à +5) */}
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={12} domain={[-5, 5]} />
            
            <Tooltip 
              contentStyle={{ background: '#0f172a', border: '1px solid #3b82f6', color: '#fff', borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px' }}
            />
            <Legend verticalAlign="top" height={36}/>
            
            {/* Pilier 1: Inflation (Rouge) */}
            <Line yAxisId="left" type="monotone" dataKey="inflation" name="Inflation" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            
            {/* Pilier 2: PIB (Vert) */}
            <Line yAxisId="left" type="monotone" dataKey="pib" name="PIB" stroke="#22c55e" strokeWidth={2} />
            
            {/* Pilier 3: Emploi/Chômage (Violet) */}
            <Line yAxisId="left" type="monotone" dataKey="emploi" name="Chômage" stroke="#a855f7" strokeWidth={2} />
            
            {/* Pilier 4: Taux d'intérêt (Jaune) */}
            <Line yAxisId="left" type="monotone" dataKey="interestRate" name="Taux d'intérêt" stroke="#eab308" strokeWidth={2} />
            
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
        L'axe de gauche représente les valeurs en %, l'axe de droite représente votre score de sentiment.
      </p>
    </div>
  );
};

export default MacroCharts;