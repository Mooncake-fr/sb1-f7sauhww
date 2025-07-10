import { useState } from 'react';
import { BarChart } from 'lucide-react';

export default function CoachStats() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Statistiques</h2>
        <p className="mt-1 text-sm text-gray-500">
          Analysez les performances de vos athlètes
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <BarChart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Pas de données</h3>
            <p className="mt-1 text-sm text-gray-500">
              Les statistiques apparaîtront ici
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}