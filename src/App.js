import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import de la config Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthModal from './components/auth/AuthModal';
import JournalPage from './components/pages/JournalPage';
import { LogOut, Layout } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {user ? (
          <JournalPage user={user} />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Maîtrisez votre Trading.</h1>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Documentez vos analyses macro, suivez votre psychologie et visualisez votre courbe de progression en temps réel avec une base de données sécurisée.
            </p>
            <button 
              onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
              style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Commencer gratuitement
            </button>
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