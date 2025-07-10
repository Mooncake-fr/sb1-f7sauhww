import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface DailyMetrics {
  mood?: number;
  energy?: number;
  sleep?: number;
}

export function useDailyMetrics() {
  const [metrics, setMetrics] = useState<DailyMetrics>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchTodayMetrics();
    return () => { mounted = false; };
  }, []);

  const fetchTodayMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Vérifier si Supabase est correctement configuré
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Configuration Supabase manquante. Veuillez cliquer sur "Connect to Supabase" en haut à droite.');
      }

      // Vérifier l'authentification
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Erreur d\'authentification:', authError);
        throw new Error('Erreur d\'authentification. Veuillez vous reconnecter.');
      }
      if (!user) {
        console.log('Aucun utilisateur connecté');
        setMetrics({});
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      console.log('Récupération des métriques pour:', today);
      
      const { data, error: fetchError } = await supabase
        .from('daily_metrics')
        .select('mood, energy, sleep')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (fetchError) {
        console.error('Erreur lors de la récupération des données:', fetchError);
        throw new Error('Impossible de récupérer vos métriques. Veuillez réessayer.');
      }

      console.log('Données récupérées:', data);

      if (data) {
        setMetrics({
          mood: data.mood,
          energy: data.energy,
          sleep: data.sleep
        });
      } else {
        setMetrics({});
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des métriques:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue');
      setMetrics({});
    } finally {
      setLoading(false);
    }
  };

  const saveMetrics = async (newMetrics: DailyMetrics) => {
    try {
      setError(null);

      // Vérifier si Supabase est correctement configuré
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Configuration Supabase manquante. Veuillez cliquer sur "Connect to Supabase" en haut à droite.');
      }

      // Vérifier l'authentification
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw new Error('Erreur d\'authentification. Veuillez vous reconnecter.');
      if (!user) throw new Error('Utilisateur non connecté');

      const today = new Date().toISOString().split('T')[0];
      console.log('Sauvegarde des métriques:', { user_id: user.id, date: today, ...newMetrics });

      const { error: upsertError } = await supabase
        .from('daily_metrics')
        .upsert({
          user_id: user.id,
          date: today,
          mood: newMetrics.mood,
          energy: newMetrics.energy,
          sleep: newMetrics.sleep,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,date'
        });

      if (upsertError) {
        console.error('Erreur lors de la sauvegarde:', upsertError);
        throw new Error('Impossible de sauvegarder vos métriques. Veuillez réessayer.');
      }

      console.log('Métriques sauvegardées avec succès');
      setMetrics(newMetrics);
      return newMetrics;
    } catch (err) {
      console.error('Erreur lors de la sauvegarde des métriques:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue');
      throw err;
    }
  };

  return {
    metrics,
    loading,
    error,
    saveMetrics,
    fetchTodayMetrics
  };
}