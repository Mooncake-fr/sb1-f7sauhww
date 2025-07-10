import { useState } from 'react';
import Button from '../components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire à implémenter
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Contactez-nous</h2>
          <p className="mt-4 text-lg text-gray-500">
            Notre équipe est là pour répondre à toutes vos questions
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Informations de contact</h3>
              <dl className="mt-4 space-y-6">
                <div className="flex">
                  <Mail className="h-6 w-6 text-blue-500" />
                  <dd className="ml-3 text-gray-500">contact@mindcoach.fr</dd>
                </div>
                <div className="flex">
                  <Phone className="h-6 w-6 text-blue-500" />
                  <dd className="ml-3 text-gray-500">+33 1 23 45 67 89</dd>
                </div>
                <div className="flex">
                  <MapPin className="h-6 w-6 text-blue-500" />
                  <dd className="ml-3 text-gray-500">
                    123 Avenue des Sports<br />
                    75001 Paris, France
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Horaires d'ouverture</h3>
              <dl className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Lundi - Vendredi</dt>
                  <dd className="text-gray-500">9h00 - 18h00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Samedi</dt>
                  <dd className="text-gray-500">10h00 - 16h00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Dimanche</dt>
                  <dd className="text-gray-500">Fermé</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}