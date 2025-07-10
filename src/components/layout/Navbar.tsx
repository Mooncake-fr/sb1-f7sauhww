import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">La Voie du Sommet</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600">
              Tarifs
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600">
              Comment ça marche
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <Link to="/login">
              <Button variant="outline">Connexion</Button>
            </Link>
            <Link to="/signup">
              <Button>S'inscrire</Button>
            </Link>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/pricing"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Tarifs
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Comment ça marche
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
            <Link to="/login" className="block px-3 py-2">
              <Button variant="outline" className="w-full">Connexion</Button>
            </Link>
            <Link to="/signup" className="block px-3 py-2">
              <Button className="w-full">S'inscrire</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}