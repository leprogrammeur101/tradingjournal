import '../App.css';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, TrendingUp, DollarSign, Activity } from 'lucide-react';

const EconomicLearningGuide = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [currentLevel, setCurrentLevel] = useState('debutant');

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const levels = {
    debutant: {
      title: "Niveau Débutant",
      description: "Les bases essentielles pour comprendre l'économie US",
      duration: "2-3 semaines",
      modules: [
        {
          id: 1,
          title: "Les Indicateurs Économiques Clés",
          icon: Activity,
          topics: [
            {
              name: "PIB (Produit Intérieur Brut)",
              explanation: "Mesure la valeur totale de tous les biens et services produits aux USA.",
              impact: "PIB ↑ = Dollar fort → DXY ↑ → EURUSD ↓",
              frequency: "Trimestriel (dernière semaine du trimestre)",
              priority: "🔴 HAUTE"
            },
            {
              name: "Taux de chômage (Unemployment Rate)",
              explanation: "Pourcentage de personnes actives sans emploi.",
              impact: "Chômage ↓ = Économie forte → DXY ↑",
              frequency: "Premier vendredi de chaque mois (NFP)",
              priority: "🔴 HAUTE"
            },
            {
              name: "Inflation (CPI - Consumer Price Index)",
              explanation: "Mesure l'évolution des prix à la consommation.",
              impact: "Inflation ↑ = Fed peut monter les taux → DXY ↑",
              frequency: "Mensuel (vers le 10-15 du mois)",
              priority: "🔴 HAUTE"
            },
            {
              name: "NFP (Non-Farm Payrolls)",
              explanation: "Nombre d'emplois créés hors secteur agricole.",
              impact: "NFP > prévisions = Dollar fort → DXY ↑",
              frequency: "Premier vendredi du mois à 14h30 CET",
              priority: "🔴 HAUTE"
            }
          ]
        },
        {
          id: 2,
          title: "La Réserve Fédérale (FED)",
          icon: DollarSign,
          topics: [
            {
              name: "Le rôle de la FED",
              explanation: "Banque centrale américaine qui contrôle la politique monétaire.",
              impact: "Décisions FED = impact DIRECT sur le DXY",
              frequency: "8 réunions FOMC par an",
              priority: "🔴 CRITIQUE"
            },
            {
              name: "Les taux d'intérêt",
              explanation: "Le coût de l'emprunt d'argent fixé par la FED.",
              impact: "Taux ↑ = Dollar attractif → investisseurs achètent USD → DXY ↑",
              frequency: "Décision à chaque réunion FOMC",
              priority: "🔴 HAUTE"
            },
            {
              name: "Forward Guidance",
              explanation: "Les indications de la FED sur ses futures actions.",
              impact: "Ton hawkish (dur) → DXY ↑ | Ton dovish (souple) → DXY ↓",
              frequency: "Conférences de presse post-FOMC",
              priority: "🟡 MOYENNE"
            }
          ]
        },
        {
          id: 3,
          title: "Application Trading : Calendrier Économique",
          icon: BookOpen,
          topics: [
            {
              name: "Comment utiliser un calendrier économique",
              explanation: "Outil indispensable pour anticiper la volatilité.",
              impact: "Évite d'entrer juste avant une news à fort impact",
              application: [
                "📅 Utilise ForexFactory ou Investing.com",
                "⏰ Filtre uniquement les news USD à impact ROUGE (3 taureaux)",
                "🚫 Évite d'ouvrir une position 30min avant ces événements",
                "✅ Attends 15-30min après la news pour voir la réaction du DXY"
              ],
              priority: "🔴 CRITIQUE"
            }
          ]
        }
      ]
    },
    intermediaire: {
      title: "Niveau Intermédiaire",
      description: "Analyse approfondie pour affiner ton trading DXY",
      duration: "3-4 semaines",
      modules: [
        {
          id: 4,
          title: "Corrélations Économiques Avancées",
          icon: TrendingUp,
          topics: [
            {
              name: "Rendements obligataires (US Treasury Yields)",
              explanation: "Taux de rendement des obligations d'État américaines (10Y notamment).",
              impact: "Yields ↑ = Dollar attractif → DXY ↑ (corrélation ~70%)",
              application: [
                "📊 Surveille le 10Y US Treasury",
                "Si yields montent + DXY stagne → potentiel rattrapage DXY ↑",
                "Divergence yields/DXY = signal de prudence"
              ],
              priority: "🔴 HAUTE"
            },
            {
              name: "Dollar Index vs Commodities",
              explanation: "Relation inverse entre DXY et matières premières.",
              impact: "DXY ↑ → Or, pétrole, cuivre ↓ (inverse 80% du temps)",
              application: [
                "Si DXY hésite mais l'or chute → confirme biais haussier DXY",
                "Renforce la conviction sur tes setups XAUUSD"
              ],
              priority: "🟡 MOYENNE"
            },
            {
              name: "Différentiels de taux",
              explanation: "Écart entre les taux US et ceux des autres pays.",
              impact: "Taux US > Taux EUR → capitaux vers USD → EURUSD ↓",
              application: [
                "Compare taux FED vs BCE, BOE, BOJ",
                "Si écart s'élargit → tendance DXY renforcée"
              ],
              priority: "🟡 MOYENNE"
            }
          ]
        },
        {
          id: 5,
          title: "Analyse des Données Macroéconomiques",
          icon: Activity,
          topics: [
            {
              name: "PMI (Purchasing Managers' Index)",
              explanation: "Indicateur de santé du secteur manufacturier et services.",
              impact: "PMI > 50 = expansion → bon pour USD",
              frequency: "Mensuel (début de mois)",
              priority: "🟡 MOYENNE"
            },
            {
              name: "Ventes au détail (Retail Sales)",
              explanation: "Mesure les dépenses des consommateurs américains.",
              impact: "Ventes ↑ = consommation forte → économie saine → DXY ↑",
              frequency: "Mensuel (mi-mois)",
              priority: "🟡 MOYENNE"
            },
            {
              name: "Balance commerciale",
              explanation: "Différence entre exportations et importations US.",
              impact: "Déficit réduit = meilleur pour USD (mais impact limité court terme)",
              frequency: "Mensuel",
              priority: "🟢 FAIBLE"
            },
            {
              name: "Confiance des consommateurs",
              explanation: "Mesure l'optimisme des ménages américains.",
              impact: "Confiance ↑ = dépenses futures → économie dynamique",
              frequency: "Mensuel (fin de mois)",
              priority: "🟢 FAIBLE"
            }
          ]
        },
        {
          id: 6,
          title: "Intégration Fondamentale + Technique",
          icon: BookOpen,
          topics: [
            {
              name: "Scénario 1 : Données positives + setup technique",
              explanation: "Confluence parfaite pour trader.",
              example: [
                "📰 NFP > prévisions (ex: 250k vs 180k attendus)",
                "📈 DXY casse un HH sur H4",
                "✅ Setup sell EURUSD sur FVG + liquidité prise",
                "🎯 Conviction MAXIMALE → taille position normale"
              ],
              priority: "🔴 HAUTE"
            },
            {
              name: "Scénario 2 : Divergence macro/technique",
              explanation: "Quand les signaux ne s'alignent pas.",
              example: [
                "📰 CPI élevé (bon pour USD)",
                "📉 Mais DXY forme un LH (baissier)",
                "⚠️ Conflit = PRUDENCE",
                "🎯 Réduis ta taille ou attends clarification"
              ],
              priority: "🔴 HAUTE"
            },
            {
              name: "Règle d'or : La macro filtre, la technique exécute",
              explanation: "Ne trade pas contre le contexte fondamental majeur.",
              example: [
                "Si la FED vient de monter les taux → biais DXY haussier pour plusieurs jours",
                "Même si tu vois un setup buy EURUSD parfait → MÉFIANCE",
                "Privilégie les setups ALIGNÉS avec le contexte macro"
              ],
              priority: "🔴 CRITIQUE"
            }
          ]
        }
      ]
    },
    avance: {
      title: "Niveau Avancé",
      description: "Maîtrise des corrélations complexes et analyse multi-marchés",
      duration: "4-6 semaines",
      modules: [
        {
          id: 7,
          title: "DXY vs US Treasury Yields : La Corrélation Maître",
          icon: TrendingUp,
          topics: [
            {
              name: "Comprendre la relation DXY/Yields",
              explanation: "Les rendements obligataires (yields) et le DXY évoluent souvent ensemble car ils reflètent l'attractivité de l'économie américaine.",
              impact: "Corrélation historique ~70-80% | Divergences = opportunités ou pièges",
              priority: "🔴 CRITIQUE",
              application: [
                "📊 Surveille le 10Y US Treasury en temps réel (TradingView: US10Y)",
                "🔍 Compare la direction : DXY ↑ + Yields ↑ = tendance confirmée",
                "⚠️ DXY ↑ mais Yields ↓ = signal de faiblesse, prudence"
              ]
            },
            {
              name: "Les 4 scénarios DXY/Yields",
              explanation: "Chaque configuration a une signification différente pour tes trades.",
              priority: "🔴 HAUTE",
              example: [
                "📈 Scénario 1 : DXY ↑ + Yields ↑",
                "→ Convergence PARFAITE = confiance maximale",
                "→ Sell EURUSD/GBPUSD agressif, buy USDJPY",
                "",
                "📉 Scénario 2 : DXY ↓ + Yields ↓",
                "→ Faiblesse USD confirmée",
                "→ Buy EURUSD/GBPUSD, sell USDJPY",
                "",
                "⚠️ Scénario 3 : DXY ↑ mais Yields ↓",
                "→ DIVERGENCE = hausse DXY fragile",
                "→ Réduis taille sur sells USD, attends confirmation",
                "",
                "⚠️ Scénario 4 : DXY ↓ mais Yields ↑",
                "→ DIVERGENCE = baisse DXY peut s'inverser",
                "→ Évite les buys USD agressifs, surveille retournement"
              ]
            },
            {
              name: "Timing : Quand les yields guident le DXY",
              explanation: "Les yields réagissent souvent AVANT le DXY, offrant un avantage prédictif.",
              priority: "🔴 HAUTE",
              application: [
                "🎯 Si les yields cassent une résistance mais DXY hésite → DXY va probablement suivre",
                "📉 Si les yields plongent mais DXY tient → surveille la cassure DXY imminente",
                "⏰ Après une décision FED, les yields bougent en PREMIER (quelques minutes avant le DXY)",
                "✅ Utilise les yields comme CONFIRMATION avancée de tes setups"
              ]
            },
            {
              name: "Outils de surveillance DXY/Yields",
              explanation: "Comment monitorer cette corrélation en temps réel.",
              priority: "🟡 MOYENNE",
              application: [
                "📺 TradingView : Graphique double (DXY + US10Y) en H4/H1",
                "🔔 Alerte si les yields cassent des niveaux clés (ex: 4%, 4.5%)",
                "📊 Vérifie le spread 10Y-2Y (courbe des taux inversée = récession possible)",
                "📈 Site FED : FRED (Federal Reserve Economic Data) pour données historiques"
              ]
            }
          ]
        },
        {
          id: 8,
          title: "XAUUSD (Or) : L'Anti-Dollar par Excellence",
          icon: DollarSign,
          topics: [
            {
              name: "Pourquoi l'or réagit au DXY",
              explanation: "L'or est coté en USD. Quand le dollar monte, l'or devient plus cher pour les acheteurs étrangers → demande baisse → prix baisse.",
              impact: "Corrélation inverse ~80% : DXY ↑ → XAUUSD ↓ | DXY ↓ → XAUUSD ↑",
              priority: "🔴 CRITIQUE"
            },
            {
              name: "Les 3 moteurs fondamentaux de l'or",
              explanation: "L'or ne dépend pas QUE du DXY. Voici les autres facteurs majeurs.",
              priority: "🔴 HAUTE",
              example: [
                "💵 1. Le Dollar (DXY)",
                "→ Influence directe et immédiate",
                "→ DXY fort = pression baissière sur XAUUSD",
                "",
                "📊 2. Les taux d'intérêt réels",
                "→ Taux réels = Taux nominaux - Inflation",
                "→ Si taux réels ↑ → coût d'opportunité de l'or ↑ → XAUUSD ↓",
                "→ Exemple : Taux FED 5% mais inflation 3% = taux réel 2%",
                "",
                "🛡️ 3. L'incertitude/risque géopolitique",
                "→ Guerre, crise financière → fuite vers l'or",
                "→ XAUUSD peut monter MÊME si DXY monte (rare mais possible)"
              ]
            },
            {
              name: "Configuration optimale pour trader XAUUSD",
              explanation: "Comment combiner DXY + fondamental spécifique à l'or.",
              priority: "🔴 HAUTE",
              application: [
                "✅ Setup SELL XAUUSD parfait :",
                "• DXY en structure haussière (HH/HL)",
                "• Yields américains en hausse",
                "• Inflation stable ou baisse (moins d'attrait pour l'or)",
                "• Pas de crise géopolitique majeure",
                "",
                "✅ Setup BUY XAUUSD parfait :",
                "• DXY en structure baissière (LH/LL)",
                "• Yields en baisse",
                "• Inflation élevée (or = protection)",
                "• Tensions géopolitiques accrues"
              ]
            },
            {
              name: "Divergences DXY/XAUUSD : Quand l'or désobéit",
              explanation: "Parfois l'or et le DXY montent ensemble. Voici pourquoi.",
              priority: "🟡 MOYENNE",
              example: [
                "🌍 Crise géopolitique majeure",
                "→ Investisseurs achètent USD (safe haven) ET or (valeur refuge)",
                "→ DXY ↑ + XAUUSD ↑ simultanément",
                "→ Ne force PAS un sell XAUUSD dans ce contexte",
                "",
                "🏦 Panique bancaire / crise financière",
                "→ Même logique : les deux actifs refuges montent",
                "",
                "📰 Décisions FED surprenantes",
                "→ FED coupe les taux en urgence → DXY peut baisser MAIS incertitude → or monte",
                "→ Attends 24-48h après la news pour trader XAUUSD"
              ]
            },
            {
              name: "Indicateurs spécifiques à l'or",
              explanation: "Data à suivre pour affiner tes trades XAUUSD.",
              priority: "🟡 MOYENNE",
              application: [
                "📊 Taux réels (Real Yields) → TradingView : US10Y - Inflation",
                "💰 ETF GLD (holdings) → Demande institutionnelle d'or",
                "🏦 Achats banques centrales → Demande structurelle (bullish long terme)",
                "📉 VIX (indice de peur) → VIX ↑ souvent = XAUUSD ↑",
                "🌐 Tensions USA-Chine/Russie → Suivre l'actualité géopolitique"
              ]
            },
            {
              name: "Règles de gestion spécifiques XAUUSD",
              explanation: "L'or est plus volatil que EURUSD, adapte ta gestion.",
              priority: "🔴 HAUTE",
              application: [
                "⚠️ XAUUSD bouge 2x plus vite qu'EURUSD → réduis ta taille de 30-50%",
                "🎯 Targets plus larges : vise 2-3R minimum (l'or fait des gros moves)",
                "🛑 Stop plus large aussi : respecte la volatilité (50-80 pips vs 20-30 sur EUR)",
                "📰 News FED/CPI = volatilité EXTRÊME → évite positions juste avant",
                "✅ L'or aime les sessions de chevauchement London-NY → timing optimal"
              ]
            }
          ]
        },
        {
          id: 9,
          title: "Stratégie Multi-Corrélation Avancée",
          icon: Activity,
          topics: [
            {
              name: "Le triangle DXY - Yields - Or",
              explanation: "Comment utiliser les 3 actifs ensemble pour valider tes convictions.",
              priority: "🔴 CRITIQUE",
              example: [
                "🎯 Convergence PARFAITE (confiance 100%) :",
                "• DXY casse HH sur H4",
                "• Yields US cassent résistance",
                "• XAUUSD casse LL et forme FVG baissier",
                "→ Sell XAUUSD AGRESSIF = tous les signaux alignés",
                "",
                "⚠️ Divergence MAJEURE (reste cash) :",
                "• DXY hésite en range",
                "• Yields montent fort",
                "• Or tient une zone de support",
                "→ Marché confus = NE TRADE PAS, attends clarification",
                "",
                "🔄 Configuration de retournement :",
                "• DXY forme LH après une hausse",
                "• Yields commencent à baisser",
                "• Or casse au-dessus d'un OB majeur",
                "→ Possible changement de régime = observe 24-48h avant d'entrer"
              ]
            },
            {
              name: "Dashboard de corrélation (à construire)",
              explanation: "Crée un tableau de bord mental ou physique pour synchroniser tes analyses.",
              priority: "🟡 MOYENNE",
              application: [
                "📋 Checklist avant chaque trade :",
                "[ ] DXY : structure claire ? (HH/HL ou LH/LL)",
                "[ ] Yields 10Y : direction ? (hausse/baisse/range)",
                "[ ] XAUUSD : en accord avec DXY ? (corrélation inverse)",
                "[ ] Contexte géopolitique : stable ? (tensions = évite XAUUSD)",
                "[ ] Prochaine news majeure : < 24h ? (évite si oui)",
                "",
                "✅ Si 4/5 conditions validées → trade avec confiance",
                "⚠️ Si ≤ 3/5 conditions validées → réduis taille ou passe"
              ]
            },
            {
              name: "Backtesting fondamental",
              explanation: "Comment tester tes setups avec le contexte macro passé.",
              priority: "🟡 MOYENNE",
              application: [
                "📅 Prends 5 trades récents (gagnants ou perdants)",
                "🔍 Pour chacun, vérifie rétrospectivement :",
                "• Quelle était la direction des yields ce jour-là ?",
                "• Y avait-il une news majeure dans les 24h ?",
                "• XAUUSD respectait-il la corrélation inverse au DXY ?",
                "",
                "💡 Identifie les patterns :",
                "• Tes meilleurs trades = convergence DXY/Yields/Or ?",
                "• Tes losses = ignoré une divergence ?",
                "",
                "🎯 Ajuste ta stratégie en conséquence"
              ]
            }
          ]
        },
        {
          id: 10,
          title: "Risk-On / Risk-Off : La Psychologie des Marchés",
          icon: Activity,
          topics: [
            {
              name: "Qu'est-ce que le Risk-On / Risk-Off ?",
              explanation: "Concept qui décrit l'appétit pour le risque des investisseurs. En Risk-On, ils cherchent du rendement (actions, cryptos). En Risk-Off, ils cherchent la sécurité (USD, or, obligations).",
              impact: "Détermine les flux de capitaux mondiaux → impact MAJEUR sur le DXY",
              priority: "🔴 CRITIQUE"
            },
            {
              name: "Environnement RISK-ON",
              explanation: "Les investisseurs sont confiants, optimistes sur l'économie.",
              priority: "🔴 HAUTE",
              example: [
                "📊 Caractéristiques :",
                "• Indices boursiers en hausse (S&P500, Nasdaq ↑)",
                "• VIX (indice de peur) en baisse < 20",
                "• Cryptomonnaies en hausse",
                "• Monnaies à haut rendement performent (AUD, NZD)",
                "",
                "💵 Impact sur le DXY :",
                "→ DXY peut BAISSER (fuite des capitaux vers actifs risqués)",
                "→ SAUF si économie US surperforme (alors DXY monte quand même)",
                "",
                "🎯 Trading en Risk-On :",
                "• Buy EURUSD, GBPUSD plus attractifs",
                "• Sell USDJPY (JPY aussi valeur refuge)",
                "• XAUUSD peut stagner ou baisser (moins d'attrait pour l'or)",
                "• Attention : DXY peut monter si données US exceptionnelles"
              ]
            },
            {
              name: "Environnement RISK-OFF",
              explanation: "Les investisseurs ont peur, cherchent la sécurité.",
              priority: "🔴 HAUTE",
              example: [
                "📊 Caractéristiques :",
                "• Indices boursiers en baisse / correction",
                "• VIX en hausse > 25-30",
                "• Cryptomonnaies en chute libre",
                "• Fuite vers USD, JPY, CHF, or",
                "",
                "💵 Impact sur le DXY :",
                "→ DXY MONTE FORT (statut de valeur refuge du dollar)",
                "→ Corrélation inversée avec actions devient évidente",
                "",
                "🎯 Trading en Risk-Off :",
                "• Sell EURUSD, GBPUSD agressif (fuite vers USD)",
                "• USDJPY peut stagner (les deux sont refuges)",
                "• XAUUSD PEUT MONTER avec DXY (rare, mais possible)",
                "• Volatilité EXTRÊME → réduis sizing de 50%"
              ]
            },
            {
              name: "Déclencheurs de changement de régime",
              explanation: "Événements qui font basculer le marché d'un mode à l'autre.",
              priority: "🔴 HAUTE",
              application: [
                "🔴 Événements Risk-Off (panique) :",
                "• Crise bancaire (ex: SVB en 2023)",
                "• Guerre / escalade géopolitique majeure",
                "• Krach boursier (-5% en une journée)",
                "• Pandémie / choc sanitaire",
                "• Défaut de paiement d'un pays majeur",
                "",
                "🟢 Événements Risk-On (confiance) :",
                "• Baisse des taux FED (politique accommodante)",
                "• Résolution de crise géopolitique",
                "• Résultats entreprises exceptionnels",
                "• Reprise économique post-récession",
                "• Accord commercial majeur (ex: USA-Chine)",
                "",
                "⚠️ En période de transition :",
                "→ Marché hésitant, volatilité élevée",
                "→ ÉVITE de trader agressivement",
                "→ Attends que le régime se stabilise (3-5 jours)"
              ]
            },
            {
              name: "Indicateurs pour mesurer le Risk Sentiment",
              explanation: "Comment savoir si on est en Risk-On ou Risk-Off.",
              priority: "🟡 MOYENNE",
              application: [
                "📈 VIX (CBOE Volatility Index) :",
                "• < 15 = Risk-On extrême (complaisance)",
                "• 15-20 = Risk-On modéré",
                "• 20-30 = Neutre / nervosité",
                "• > 30 = Risk-Off / panique",
                "",
                "📊 S&P 500 vs DXY :",
                "• S&P ↑ + DXY ↓ = Risk-On classique",
                "• S&P ↓ + DXY ↑ = Risk-Off classique",
                "• S&P ↑ + DXY ↑ = Force US (exception)",
                "",
                "💰 Autres indicateurs :",
                "• High Yield Spreads (obligations risquées) → ↑ = Risk-Off",
                "• Flux ETF (argent rentre/sort des actions)",
                "• AUD/JPY (paire Risk-On par excellence)"
              ]
            },
            {
              name: "Intégration Risk-On/Off dans ta stratégie DXY",
              explanation: "Comment utiliser ce concept concrètement.",
              priority: "🔴 CRITIQUE",
              application: [
                "✅ Check quotidien (5 minutes) :",
                "1. Ouvre TradingView : VIX + S&P500",
                "2. Détermine le régime actuel",
                "3. Ajuste tes attentes sur le DXY",
                "",
                "📋 Règles d'ajustement :",
                "• Risk-Off confirmé → biais DXY haussier FORT",
                "  → Privilégie UNIQUEMENT sells EURUSD/GBP, sells XAUUSD",
                "• Risk-On confirmé → biais DXY baissier ou neutre",
                "  → Évite les sells USD agressifs, préfère buys EUR/GBP",
                "• Transition / incertitude → RÉDUIS fréquence de trades",
                "",
                "🚨 Alerte changement de régime :",
                "• VIX bondit de +30% en une journée → Risk-Off imminent",
                "• Clôture tes positions contre-tendance immédiatement",
                "• Repositionne-toi dans le sens du nouveau régime"
              ]
            }
          ]
        },
        {
          id: 11,
          title: "Cycles Économiques des USA : Contexte Historique",
          icon: BookOpen,
          topics: [
            {
              name: "Les 4 phases du cycle économique",
              explanation: "Toute économie traverse ces étapes de manière cyclique.",
              priority: "🔴 HAUTE",
              example: [
                "📈 Phase 1 : EXPANSION (Recovery)",
                "• Croissance du PIB +2% ou plus",
                "• Chômage en baisse",
                "• Consommation en hausse",
                "• FED maintient taux bas pour soutenir",
                "💵 DXY : Neutre à haussier (si croissance US > reste du monde)",
                "",
                "🚀 Phase 2 : BOOM (Peak)",
                "• PIB au maximum, économie surchauffe",
                "• Chômage très bas (< 4%)",
                "• Inflation commence à monter",
                "• FED monte les taux pour refroidir l'économie",
                "💵 DXY : HAUSSIER (taux élevés attirent capitaux)",
                "",
                "📉 Phase 3 : CONTRACTION (Recession)",
                "• PIB négatif 2 trimestres consécutifs",
                "• Chômage remonte",
                "• Consommation chute, entreprises licencient",
                "• FED commence à baisser les taux",
                "💵 DXY : Dépend du contexte (refuge si crise mondiale)",
                "",
                "🔻 Phase 4 : CREUX (Trough)",
                "• Économie au plus bas, avant reprise",
                "• Chômage élevé mais stabilisé",
                "• FED en mode stimulus (QE, taux à 0%)",
                "• Prémices de reprise apparaissent",
                "💵 DXY : Généralement BAISSIER (taux bas, stimulus)"
              ]
            },
            {
              name: "Évolution récente : 2008-2025",
              explanation: "Les cycles majeurs qui ont façonné l'économie US moderne.",
              priority: "🔴 HAUTE",
              example: [
                "🏦 2008-2009 : CRISE FINANCIÈRE",
                "• Lehman Brothers collapse, krach immobilier",
                "• FED baisse taux à 0%, lance QE (Quantitative Easing)",
                "• Chômage monte à 10%",
                "💵 DXY : Volatil, monte fin 2008 (refuge) puis baisse 2009-2011",
                "",
                "📈 2010-2019 : EXPANSION LONGUE (11 ans)",
                "• Plus longue expansion de l'histoire US",
                "• Chômage passe de 10% à 3.5%",
                "• FED remonte taux progressivement (2015-2018)",
                "• Guerre commerciale USA-Chine (2018-2019)",
                "💵 DXY : Haussier 2014-2017, puis range 2018-2019",
                "",
                "🦠 2020 : PANDÉMIE COVID-19",
                "• Shutdown économique, chômage à 14.7%",
                "• FED coupe taux à 0% en urgence, QE massif",
                "• Stimulus gouvernemental historique (trillions $)",
                "💵 DXY : Spike mars 2020 (panique), puis baisse 2020-2021",
                "",
                "🔥 2021-2022 : INFLATION GALOPANTE",
                "• Inflation atteint 9.1% (juin 2022), plus haut depuis 40 ans",
                "• FED hausse taux agressivement : 0% → 5.25% en 18 mois",
                "• Récession évitée de justesse (soft landing)",
                "💵 DXY : HAUSSIER FORT (2021-2023), pic à 114 en sept 2022",
                "",
                "📊 2023-2024 : ATTERRISSAGE EN DOUCEUR",
                "• Inflation redescend vers 3-4%",
                "• Chômage reste bas (~4%)",
                "• FED maintient taux élevés (5%+) plus longtemps",
                "• 'Higher for longer' = nouvelle doctrine",
                "💵 DXY : Range 100-106, volatilité modérée",
                "",
                "🎯 2025 : PÉRIODE ACTUELLE",
                "• FED commence à baisser taux prudemment",
                "• Économie résiliente, pas de récession",
                "• Inflation stubborn autour de 3%",
                "• Élections US créent incertitude politique",
                "💵 DXY : Dépend des données (watch NFP, CPI, FED)"
              ]
            },
            {
              name: "Identifier où nous sommes dans le cycle",
              explanation: "Comment déterminer la phase actuelle pour anticiper les mouvements.",
              priority: "🔴 CRITIQUE",
              application: [
                "🔍 Checklist de phase (à faire mensuellement) :",
                "",
                "1️⃣ Croissance du PIB :",
                "• > 3% = Expansion/Boom",
                "• 1-3% = Expansion modérée",
                "• 0-1% = Ralentissement",
                "• < 0% = Récession",
                "",
                "2️⃣ Taux de chômage :",
                "• < 4% = Économie chaude",
                "• 4-6% = Normal",
                "• > 6% = Faiblesse",
                "",
                "3️⃣ Inflation :",
                "• > 4% = Surchauffe, FED va agir",
                "• 2-4% = Cible FED, stable",
                "• < 2% = Déflation risk",
                "",
                "4️⃣ Direction des taux FED :",
                "• Hausse = Phase Boom → DXY haussier",
                "• Pause = Pic ou observation",
                "• Baisse = Prévention récession ou récession",
                "",
                "✅ Combine ces 4 éléments pour situer le cycle actuel"
              ]
            },
            {
              name: "Trading selon le cycle économique",
              explanation: "Adapter ta stratégie à chaque phase.",
              priority: "🔴 HAUTE",
              application: [
                "📈 En EXPANSION :",
                "• DXY peut être neutre ou haussier modéré",
                "• Trade les deux sens (buy/sell) selon structure technique",
                "• Privilégie London-NY sessions (liquidité normale)",
                "",
                "🚀 En BOOM (taux montent) :",
                "• BIAIS HAUSSIER DXY dominant",
                "• Privilégie sells EURUSD, GBPUSD, XAUUSD",
                "• Sois patient sur buys USD, attends pullbacks profonds",
                "• Attention : phase peut durer 1-2 ans",
                "",
                "📉 En CONTRACTION (récession) :",
                "• Si crise mondiale → Risk-Off → DXY MONTE (refuge)",
                "• Si récession US isolée → DXY BAISSE",
                "• VOLATILITÉ EXTRÊME → réduis sizing 50%",
                "• Évite les positions overnight",
                "",
                "🔻 En CREUX (stimulus FED) :",
                "• BIAIS BAISSIER DXY (taux bas, QE)",
                "• Privilégie buys EURUSD, GBPUSD",
                "• Sells USDJPY attractifs",
                "• XAUUSD peut exploser (or adore les taux à 0%)",
                "",
                "🎯 Règle d'or :",
                "→ Ne JAMAIS trader contre la phase du cycle de manière agressive",
                "→ Si en phase Boom (taux montent), n'achète pas EUR/GBP lourdement",
                "→ Attends un changement de cycle ou trade dans le sens dominant"
              ]
            },
            {
              name: "Ressources pour suivre les cycles",
              explanation: "Outils pour rester à jour sur la phase économique.",
              priority: "🟡 MOYENNE",
              application: [
                "📊 Sites de données économiques :",
                "• FRED (Federal Reserve Economic Data) → fred.stlouisfed.org",
                "• Bureau of Economic Analysis → bea.gov (PIB officiel)",
                "• Bureau of Labor Statistics → bls.gov (emploi, inflation)",
                "",
                "📰 Sources d'analyse :",
                "• FOMC Minutes (compte-rendu réunions FED) → très important",
                "• Bloomberg / Reuters pour commentaires experts",
                "• Rapports trimestriels FED (Beige Book)",
                "",
                "📈 Indicateurs avancés (prédictifs) :",
                "• Courbe des taux inversée (10Y-2Y) → récession possible dans 12-18 mois",
                "• Leading Economic Index (LEI)",
                "• ISM Manufacturing PMI",
                "",
                "⏰ Routine mensuelle recommandée :",
                "• 1er vendredi : NFP (emploi)",
                "• ~10-15 du mois : CPI (inflation)",
                "• Fin du mois : PIB (si trimestre concerné)",
                "• Réunion FOMC (8x/an) : CRITIQUE"
              ]
            }
          ]
        }
      ]
    }
  };

  const currentLevelData = levels[currentLevel];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e3a8a, #0f172a)', padding: '1.5rem' }}>
      <div className="max-w-5xl mx-auto" style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(16px)', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>
            Guide d'Apprentissage Économique
          </h1>
          <p className="text-blue-200 text-lg mb-4" style={{ color: '#bfdbfe', fontSize: '1.125rem', marginBottom: '1rem' }}>
            Pour optimiser ta stratégie avec l'analyse fondamentale
          </p>
          <div className="flex gap-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentLevel('debutant')} style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: currentLevel === 'debutant' ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  transform: currentLevel === 'debutant' ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: currentLevel === 'debutant' ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentLevel === 'debutant'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Débutant
            </button>
            <button
              onClick={() => setCurrentLevel('intermediaire')} 
                  style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: currentLevel === 'intermediaire' ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  transform: currentLevel === 'intermediaire' ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: currentLevel === 'intermediaire' ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentLevel === 'intermediaire'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Intermédiaire
            </button>
            <button
              onClick={() => setCurrentLevel('avance')} 
                  style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  background: currentLevel === 'avance' ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  transform: currentLevel === 'avance' ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: currentLevel === 'avance' ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentLevel === 'avance'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Avancé
            </button>
          </div>
        </div>

        {/* Level Info */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-xl p-6 mb-8 border border-blue-400/30" style={{ background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))', backdropFilter: 'blur(16px)', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
            {currentLevelData.title}
          </h2>
          <p className="text-blue-100 mb-2" style={{ color: '#bfdbfe', marginBottom: '0.5rem' }}>{currentLevelData.description}</p>
          <p className="text-blue-200 text-sm" style={{ color: '#93c5fd', fontSize: '0.875rem' }}>⏱️ Durée estimée : {currentLevelData.duration}</p>
        </div>

        {/* Modules */}
        {currentLevelData.modules.map((module) => {
          const Icon = module.icon;
          return (
            <div
              key={module.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl mb-6 border border-white/20 overflow-hidden"
              style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(16px)', borderRadius: '0.75rem', marginBottom: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.2)', overflow: 'hidden' }}
            >
              <button
                onClick={() => toggleSection(module.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                  style={{
                width: '100%',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div className="flex items-center gap-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="bg-blue-500/30 p-3 rounded-lg" style={{ background: 'rgba(59, 130, 246, 0.3)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                    <Icon className="text-blue-300" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white text-left" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', textAlign: 'left' }}>
                    {module.title}
                  </h3>
                </div>
                {expandedSections[module.id] ? (
                  <ChevronUp className="text-blue-300" size={24} />
                ) : (
                  <ChevronDown className="text-blue-300" size={24} />
                )}
              </button>

              {expandedSections[module.id] && (
                <div className="px-6 pb-6"style={{ padding: '0 1.5rem 1.5rem' }}>
                  {module.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800/50 rounded-lg p-5 mb-4 border border-slate-700/50"
                      style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.5rem', padding: '1.25rem', marginBottom: '1rem', border: '1px solid rgba(71, 85, 105, 0.5)' }}
                    >
                      <div className="flex items-start justify-between mb-3" style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <h4 className="text-lg font-semibold text-blue-300" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#93c5fd' }}>
                          {topic.name}
                        </h4>
                        <span className="text-xs px-2 py-1 rounded bg-slate-700 text-white"style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', background: '#475569', color: 'white' }}>
                          {topic.priority}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-3 leading-relaxed"style={{ color: '#d1d5db', marginBottom: '0.75rem', lineHeight: '1.625' }}>
                        {topic.explanation}
                      </p>

                      {topic.impact && (
                        <div className="bg-blue-900/30 rounded-lg p-3 mb-3 border-l-4 border-blue-400"style={{ background: 'rgba(30, 58, 138, 0.3)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '0.75rem', borderLeft: '4px solid #60a5fa' }}>
                          <p className="text-sm font-semibold text-blue-200 mb-1"style={{ fontSize: '0.875rem', fontWeight: '600', color: '#bfdbfe', marginBottom: '0.25rem' }}>
                            Impact sur le DXY :
                          </p>
                          <p className="text-blue-100 font-mono text-sm" style={{ color: '#bfdbfe', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                            {topic.impact}
                          </p>
                        </div>
                      )}

                      {topic.frequency && (
                        <p className="text-gray-400 text-sm mb-2"style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                          📅 <span className="font-semibold"style={{ fontWeight: '600' }}>Fréquence :</span> {topic.frequency}
                        </p>
                      )}

                      {topic.application && (
                        <div className="bg-green-900/20 rounded-lg p-3 border border-green-700/30 mt-3"style={{ background: 'rgba(6, 78, 59, 0.2)', borderRadius: '0.5rem', padding: '0.75rem', border: '1px solid rgba(4, 120, 87, 0.3)', marginTop: '0.75rem' }}>
                          <p className="text-sm font-semibold text-green-300 mb-2"style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6ee7b7', marginBottom: '0.5rem' }}>
                            💡 Application pratique :
                          </p>
                          <ul className="space-y-1"style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {topic.application.map((item, i) => (
                              <li key={i} className="text-green-100 text-sm"style={{ color: '#a7f3d0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {topic.example && (
                        <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-700/30 mt-3"style={{ background: 'rgba(88, 28, 135, 0.2)', borderRadius: '0.5rem', padding: '0.75rem', border: '1px solid rgba(126, 34, 206, 0.3)', marginTop: '0.75rem' }}>
                          <p className="text-sm font-semibold text-purple-300 mb-2"style={{ fontSize: '0.875rem', fontWeight: '600', color: '#c084fc', marginBottom: '0.5rem' }}>
                            📝 Exemple concret :
                          </p>
                          <ul className="space-y-1"style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {topic.example.map((item, i) => (
                              <li key={i} className="text-purple-100 text-sm"style={{ color: '#d8b4fe', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Summary Box */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-xl p-6 border border-green-400/30" style={{ background: 'linear-gradient(to right, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))', backdropFilter: 'blur(16px)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(34, 197, 94, 0.3)', marginBottom: '2rem' }}>
          <h3 className="text-xl font-bold text-white mb-3"style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>
            🎯 Résumé : Comment intégrer le fondamental dans ta stratégie
          </h3>
          <ul className="space-y-2 text-green-100"style={{ listStyle: 'none', padding: 0, margin: 0, color: '#a7f3d0' }}>
            <li style={{ marginBottom: '0.5rem' }}>✅ Vérifie TOUJOURS le calendrier économique avant de trader</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ Évite les positions 30min avant les news à fort impact</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ Utilise le contexte macro pour FILTRER tes setups techniques</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ En cas de divergence macro/technique → RÉDUIS ta taille ou abstiens-toi</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ Les décisions FED = changement de régime pour plusieurs jours/semaines</li>
            <li style={{ marginBottom: '0.5rem' }}>✅ La macro donne la DIRECTION, la technique donne l'ENTRÉE</li>
          </ul>
        </div>

        {/* Resources */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(16px)', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.2)', marginBottom: '2rem' }}>
          <h3 className="text-xl font-bold text-white mb-4"style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>📚 Ressources recommandées</h3>
          <div className="grid md:grid-cols-2 gap-4"style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div className="bg-slate-800/50 rounded-lg p-4"style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.5rem', padding: '1rem' }}>
              <h4 className="font-semibold text-blue-300 mb-2"style={{ fontWeight: '600', color: '#93c5fd', marginBottom: '0.5rem' }}>Calendriers économiques</h4>
              <ul className="text-gray-300 text-sm space-y-1"style={{ color: '#d1d5db', fontSize: '0.875rem', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.25rem' }}>• ForexFactory.com</li>
                <li style={{ marginBottom: '0.25rem' }}>• Investing.com</li>
                <li style={{ marginBottom: '0.25rem' }}>• TradingEconomics.com</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4"style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.5rem', padding: '1rem' }}>
              <h4 className="font-semibold text-blue-300 mb-2"style={{ fontWeight: '600', color: '#93c5fd', marginBottom: '0.5rem' }}>Sources d'analyse</h4>
              <ul className="text-gray-300 text-sm space-y-1"style={{ color: '#d1d5db', fontSize: '0.875rem', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.25rem' }}>• Site officiel de la FED (federalreserve.gov)</li>
                <li style={{ marginBottom: '0.25rem' }}>• Bureau of Labor Statistics (BLS)</li>
                <li style={{ marginBottom: '0.25rem' }}>• Bloomberg / Reuters pour l'actualité</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicLearningGuide;