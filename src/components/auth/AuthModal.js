import React, { useState } from 'react';
import { auth } from './firebase'; // Vérifie que le chemin est correct
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { X, Eye, EyeOff, Lock, Mail } from 'lucide-react';

const AuthModal = ({ onClose, authMode, setAuthMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (authMode === 'register') {
        // --- LOGIQUE INSCRIPTION ---
        if (password !== confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // --- LOGIQUE CONNEXION ---
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose(); // Ferme la modal une fois connecté
    } catch (err) {
      // Traduction des erreurs Firebase courantes
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Cet email est déjà utilisé.');
          break;
        case 'auth/invalid-email':
          setError('Format d\'email invalide.');
          break;
        case 'auth/weak-password':
          setError('Le mot de passe est trop court (min 6 car.).');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Email ou mot de passe incorrect.');
          break;
        default:
          setError('Une erreur est survenue. Réessayez.');
      }
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
      <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '2rem', maxWidth: '400px', width: '100%', border: '1px solid rgba(59, 130, 246, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {authMode === 'login' ? '🔐 Connexion' : '📝 Inscription'}
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Champ Email */}
          <div>
            <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                placeholder="nom@exemple.com"
              />
            </div>
          </div>

          {/* Champ Mot de Passe */}
          <div>
            <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Mot de passe</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirmation (uniquement pour inscription) */}
          {authMode === 'register' && (
            <div>
              <label style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>Confirmer le mot de passe</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #334155', background: '#0f172a', color: 'white' }}
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem', padding: '0.75rem', color: '#fca5a5', fontSize: '0.875rem' }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', transition: '0.2s' }}
          >
            {authMode === 'login' ? 'Se connecter' : "Créer mon compte"}
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setError(''); }}
            style={{ background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
          >
            {authMode === 'login' ? "Nouveau ici ? Créer un compte" : "Déjà un compte ? Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;