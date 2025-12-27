import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  Cell 
} from 'recharts';

const SessionAnalysis = ({ trades }) => {
  const daysShort = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // 1. Analyse et tri des données
  const analysis = trades.reduce((acc, t) => {
    const tradeDate = new Date(t.date);
    const hour = tradeDate.getHours();
    const dayIndex = tradeDate.getDay();
    const profit = parseFloat(t.profit$) || 0;

    // --- Logique Sessions ---
    let session = 'Asie';
    if (hour >= 8 && hour < 14) session = 'Londres';
    else if (hour >= 14 && hour < 20) session = 'New York';

    if (!acc.sessions[session]) {
      acc.sessions[session] = { name: session, Gains: 0, Pertes: 0 };
    }
    if (profit >= 0) acc.sessions[session].Gains += profit;
    else acc.sessions[session].Pertes += Math.abs(profit);

    // --- Logique Jours ---
    const dayName = daysShort[dayIndex];
    if (!acc.days[dayName]) acc.days[dayName] = 0;
    acc.days[dayName] += profit;

    return acc;
  }, { sessions: {}, days: {} });

  // Transformation pour le graphique des Sessions
  const sessionChartData = Object.values(analysis.sessions).map(s => ({
    ...s,
    Gains: parseFloat(s.Gains.toFixed(2)),
    Pertes: parseFloat(s.Pertes.toFixed(2))
  }));
  const order = { 'Asie': 1, 'Londres': 2, 'New York': 3 };
  sessionChartData.sort((a, b) => order[a.name] - order[b.name]);

  // Transformation pour le graphique des Jours
  const dayChartData = daysShort.map(day => ({
    name: day,
    profit: parseFloat((analysis.days[day] || 0).toFixed(2))
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* SECTION SESSIONS (GAINS VS PERTES) */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        padding: '1.5rem', 
        borderRadius: '0.75rem', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '320px'
      }}>
        <h4 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>
          Gains vs Pertes par Session
        </h4>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={sessionChartData} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
            <Bar dataKey="Gains" fill="#10b981" radius={[4, 4, 0, 0]} name="Gains" />
            <Bar dataKey="Pertes" fill="#ef4444" radius={[4, 4, 0, 0]} name="Pertes" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SECTION PERFORMANCE PAR JOUR (NETTE) */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        padding: '1.5rem', 
        borderRadius: '0.75rem', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '220px'
      }}>
        <h4 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>
          Performance Nette par Jour
        </h4>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={dayChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ background: '#70747dff', border: 'none', borderRadius: '8px' }}
              formatter={(v) => [`${v}$`, 'Profit Net']}
            />
            <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
              {dayChartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.profit >= 0 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(239, 68, 68, 0.5)'} 
                  stroke={entry.profit >= 0 ? '#3b82f6' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default SessionAnalysis;