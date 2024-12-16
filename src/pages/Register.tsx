import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    purchaseCode: '',
    isFollowing: false,
    hasCommented: false,
    hasShared: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validações
      if (!formData.isFollowing || !formData.hasCommented || !formData.hasShared) {
        throw new Error('Por favor, complete todas as etapas no Instagram antes de se registrar.');
      }

      if (!formData.instagram.startsWith('@')) {
        formData.instagram = '@' + formData.instagram;
      }

      // Primeiro, verifica se o código de compra existe e não foi usado
      const { data: codeData, error: codeError } = await supabase
        .from('purchase_codes')
        .select('*')
        .eq('code', formData.purchaseCode)
        .eq('used', false)
        .single();

      if (codeError || !codeData) {
        throw new Error('Código de compra inválido ou já utilizado.');
      }

      // Verifica se o código já foi usado por outro participante
      const { data: existingParticipant } = await supabase
        .from('participants')
        .select('*')
        .eq('code', formData.purchaseCode)
        .single();

      if (existingParticipant) {
        throw new Error('Este código já foi utilizado por outro participante.');
      }

      // Insere o novo participante
      const { error: insertError } = await supabase
        .from('participants')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            instagram: formData.instagram,
            code: formData.purchaseCode,
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) throw insertError;

      // Marca o código como usado
      const { error: updateError } = await supabase
        .from('purchase_codes')
        .update({ used: true })
        .eq('code', formData.purchaseCode);

      if (updateError) throw updateError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        instagram: '',
        purchaseCode: '',
        isFollowing: false,
        hasCommented: false,
        hasShared: false,
      });
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao registrar sua participação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Participar do Sorteio
            </h2>
            <p className="mt-2 text-gray-600">
              Preencha o formulário abaixo para participar
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-6 bg-green-50 rounded-xl"
            >
              <svg
                className="w-12 h-12 text-green-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                Registro Confirmado!
              </h3>
              <p className="text-green-700">
                Sua participação foi registrada com sucesso. Boa sorte!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                    Instagram (ex: @seu.perfil)
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    required
                    value={formData.instagram}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="purchaseCode" className="block text-sm font-medium text-gray-700">
                    Código da Compra
                  </label>
                  <input
                    type="text"
                    id="purchaseCode"
                    name="purchaseCode"
                    required
                    value={formData.purchaseCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFollowing"
                      name="isFollowing"
                      checked={formData.isFollowing}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isFollowing" className="ml-2 block text-sm text-gray-700">
                      Confirmo que estou seguindo @alfa.prime_ no Instagram
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasCommented"
                      name="hasCommented"
                      checked={formData.hasCommented}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasCommented" className="ml-2 block text-sm text-gray-700">
                      Confirmo que marquei 3 amigos no post do sorteio
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasShared"
                      name="hasShared"
                      checked={formData.hasShared}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasShared" className="ml-2 block text-sm text-gray-700">
                      Confirmo que compartilhei o post nos stories e marquei @alfa.prime_
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Registrando...' : 'Confirmar Participação'}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
} 