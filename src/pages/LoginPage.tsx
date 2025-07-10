import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { createTestUser } = useAuth();
  const navigate = useNavigate();

  const handleTestLogin = async (type: 'athlete' | 'coach') => {
    try {
      setError('');
      setLoading(true);
      await createTestUser();
      navigate(type === 'coach' ? '/coach' : '/dashboard');
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Une erreur est survenue. Veuillez réessayer dans quelques instants.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choisissez votre type de compte pour la démo
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <Button
            onClick={() => handleTestLogin('athlete')}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Connexion en cours...
              </span>
            ) : (
              'Se connecter comme Athlète'
            )}
          </Button>

          <Button
            onClick={() => handleTestLogin('coach')}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Connexion en cours...
              </span>
            ) : (
              'Se connecter comme Coach'
            )}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Si le bouton "Connect to Supabase" n'est pas visible, veuillez rafraîchir la page
          </p>
        </div>
      </div>
    </div>
  );
}