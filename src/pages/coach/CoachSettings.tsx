import { useState } from 'react';
import { Settings } from 'lucide-react';

export default function CoachSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos préférences et paramètres
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Settings className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Configuration</h3>
            <p className="mt-1 text-sm text-gray-500">
              Les paramètres seront disponibles prochainement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}