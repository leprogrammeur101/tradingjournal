import React, { useEffect } from 'react';

const MacroDashboard = () => {
  useEffect(() => {
    // 1. Script pour le Calendrier Économique
    const scriptCal = document.createElement('script');
    scriptCal.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    scriptCal.async = true;
    scriptCal.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "400",
      "colorTheme": "dark",
      "isTransparent": true,
      "locale": "fr",
      "importanceFilter": "-1,0,1",
      "currencyFilter": "USD,EUR,GBP,JPY"
    });

    // 2. Script pour la Jauge Technique (EURUSD pour éviter les erreurs de flux)
    const scriptGauge = document.createElement('script');
    scriptGauge.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    scriptGauge.async = true;
    scriptGauge.innerHTML = JSON.stringify({
      "interval": "1D",
      "width": "100%",
      "isTransparent": true,
      "height": "400",
      "symbol": "FX:EURUSD",
      "showIntervalTabs": true,
      "displayMode": "single",
      "locale": "fr",
      "colorTheme": "dark"
    });

    // 3. Script pour la Heatmap (Performance relative)
    const scriptHeat = document.createElement('script');
    scriptHeat.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
    scriptHeat.async = true;
    scriptHeat.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "400",
      "currencies": ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      "isTransparent": true,
      "colorTheme": "dark",
      "locale": "fr"
    });

    const scriptSentiment = document.createElement('script');
    scriptSentiment.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    scriptSentiment.async = true;
    scriptSentiment.innerHTML = JSON.stringify({
      "title": "Sentiment Retail (Indices & Forex)",
      "width": "100%",
      "height": "400",
      "symbolsGroups": [
        {
          "name": "Sentiment Global",
          "originalName": "Indices",
          "symbols": [
            { "name": "FX:EURUSD", "displayName": "EUR/USD" },
            { "name": "FX:GBPUSD", "displayName": "GBP/USD" },
            { "name": "OANDA:NAS100USD", "displayName": "Nasdaq 100" },
            { "name": "OANDA:XAUUSD", "displayName": "Or (Gold)" }
          ]
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "isTransparent": true,
      "locale": "fr"
    });

    const containerSentiment = document.getElementById('tv-sentiment-container');
    if (containerSentiment && !containerSentiment.firstChild) containerSentiment.appendChild(scriptSentiment);

    const containerCal = document.getElementById('tv-calendar-container');
    const containerGauge = document.getElementById('tv-gauge-container');
    const containerHeat = document.getElementById('tv-heatmap-container');

    if (containerCal && !containerCal.firstChild) containerCal.appendChild(scriptCal);
    if (containerGauge && !containerGauge.firstChild) containerGauge.appendChild(scriptGauge);
    if (containerHeat && !containerHeat.firstChild) containerHeat.appendChild(scriptHeat);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
      
      {/* Ligne du haut : Calendrier et Jauge */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <h4 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>📅 CALENDRIER ÉCONOMIQUE</h4>
          <div id="tv-calendar-container"></div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <h4 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>⚖️ TECHNIQUE DU SENTIMENT (EURUSD)</h4>
          <div id="tv-gauge-container"></div>
        </div>
      </div>

      {/* Ligne du bas : Heatmap de Marché */}
      <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <h4 style={{ color: '#60a5fa', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>🌍 HEATMAP DES DEVISES (FORCE RELATIVE)</h4>
        <div id="tv-heatmap-container"></div>
        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
          Compare la force d'une devise par rapport à toutes les autres en temps réel.
        </p>
      </div>
      
    </div>
  );
};

export default MacroDashboard;