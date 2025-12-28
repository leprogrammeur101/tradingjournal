import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Cell 
} from 'recharts';

const PerformanceCharts = ({ trades, initialCapital }) => {
  // --- LOGIQUE ÉVOLUTION DU CAPITAL ---
  const startBalance = parseFloat(initialCapital) || 0;
  let cumulativeBalance = startBalance;
  
  const equityData = [...trades]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((trade, index) => {
      cumulativeBalance += parseFloat(trade.profit$) || 0;
      return {
        name: `T${index + 1}`,
        balance: cumulativeBalance,
      };
    });

  const chartData = [{ name: 'Départ', balance: startBalance }, ...equityData];

  // --- LOGIQUE PROFIT PAR ACTIF ---
  const pairStats = trades.reduce((acc, t) => {
    const pair = t.pair || 'Inconnue';
    const profit = parseFloat(t.profit$) || 0;
    if (!acc[pair]) acc[pair] = 0;
    acc[pair] += profit;
    return acc;
  }, {});

  const pairChartData = Object.entries(pairStats)
    .map(([name, profit]) => ({
      name,
      profit: parseFloat(profit.toFixed(2))
    }))
    .sort((a, b) => b.profit - a.profit);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* GRAPHIQUE 1 : ÉVOLUTION DU CAPITAL */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        padding: '1.5rem', 
        borderRadius: '0.75rem', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
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

      {/* GRAPHIQUE 2 : PROFIT NET PAR ACTIF */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        padding: '1.5rem', 
        borderRadius: '0.75rem', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '300px' 
      }}>
        <h4 style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>
          Profit Net par Actif
        </h4>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart 
            data={pairChartData} 
            layout="vertical" 
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
            <XAxis type="number" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}$`} />
            <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
              contentStyle={{ background: '#6b7284ff', border: '1px solid #334155', borderRadius: '8px' }}
            />
            <Bar dataKey="profit" radius={[0, 4, 4, 0]}>
              {pairChartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.profit >= 0 ? '#10b981' : '#ef4444'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default PerformanceCharts;