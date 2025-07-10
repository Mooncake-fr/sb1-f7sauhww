import { createContext, useContext, useState, useEffect } from 'react';
import { createClient, User } from '@supabase/supabase-js';

// Vérification et configuration de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement Supabase manquantes:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Configuration Supabase incomplète');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  createTestUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (mounted) {
          setCurrentUser(session?.user ?? null);
          setError(null);
        }
      } catch (err) {
        console.error('Erreur d\'initialisation de l\'auth:', err);
        if (mounted) {
          setError('Erreur de connexion au service d\'authentification');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setCurrentUser(session?.user ?? null);
        setLoading(false);
        setError(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function createTestUser() {
    try {
      setLoading(true);
      setError(null);

      // Tenter la connexion
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'password123'
      });

      if (signInError) {
        // Si la connexion échoue, créer un nouveau compte
        const { error: signUpError } = await supabase.auth.signUp({
          email: 'test@example.com',
          password: 'password123',
          options: {
            data: { 
              name: 'Thomas',
              role: 'athlete'
            }
          }
        });

        if (signUpError) {
          throw signUpError;
        }
      }

      setError(null);
    } catch (err) {
      console.error('Erreur de création/connexion du compte test:', err);
      setError(
        'Veuillez d\'abord cliquer sur le bouton "Connect to Supabase" en haut à droite ' +
        'pour initialiser la base de données.'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function signup(email: string, password: string, name?: string) {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0],
            role: 'athlete'
          }
        }
      });

      if (error) throw error;
    } catch (err) {
      setError('Échec de l\'inscription. Veuillez réessayer.');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError('Échec de la connexion. Veuillez réessayer.');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError('Échec de la déconnexion. Veuillez réessayer.');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    createTestUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}