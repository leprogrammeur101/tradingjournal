import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import de la config Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthModal from './components/auth/AuthModal';
import JournalPage from './pages/JournalPage';
import GuidePage from './pages/GuidePage'
import { LogOut, Layout } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [activeTab, setActiveTab] = useState('guide');
  // 1. Écouter l'état de connexion de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Nettoyage de l'écouteur
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
        Chargement de votre journal...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc' }}>
      {/* Navigation Header */}
      <nav style={{ padding: '1rem 2rem', background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
          <Layout className="text-blue-500" />
          <span>MacroJournal <span style={{ color: '#3b82f6' }}>Pro</span></span>
        </div>

        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{user.email}</span>
              <button 
                onClick={handleLogout}
                style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <LogOut size={16} /> Déconnexion
              </button>
            </div>
          ) : (
            <button 
              onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
              style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Se connecter
            </button>
          )}
        </div>
      </nav>

      <main style={{ padding: '2rem' }}>
        {/* Barre d'onglets pour tout le monde */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #374151', paddingBottom: '1rem' }}>
          <button 
            onClick={() => setActiveTab('guide')}
            style={{
              padding: '0.5rem 1rem',
              color: activeTab === 'guide' ? '#3b82f6' : '#94a3b8',
              borderBottom: activeTab === 'guide' ? '2px solid #3b82f6' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Guide Économique
          </button>
          <button 
            onClick={() => setActiveTab('journal')}
            style={{
              padding: '0.5rem 1rem',
              color: activeTab === 'journal' ? '#3b82f6' : '#94a3b8',
              borderBottom: activeTab === 'journal' ? '2px solid #3b82f6' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Mon Journal
          </button>
        </div>

        {/* Affichage du contenu selon l'onglet et l'état de connexion */}
        {activeTab === 'guide' ? (
          <GuidePage />
        ) : (
          <div>
            {user ? (
              <JournalPage user={user} />
            ) : (
              <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                <h2>Connectez-vous pour accéder à votre journal</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                  Suivez vos performances et analysez votre psychologie de trading.
                </p>
                <button 
                  onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                  style={{ background: '#3b82f6', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  Se connecter
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      
      {/* Modal d'Authentification */}
      {isAuthModalOpen && (
        <AuthModal 
          authMode={authMode}
          setAuthMode={setAuthMode}
          onClose={() => setIsAuthModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;