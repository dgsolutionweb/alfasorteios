import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { supabase } from '../supabaseClient';
import PrintableCoupon from '../components/PrintableCoupon';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [codes, setCodes] = useState<string[]>([]);
  const [codeCount, setCodeCount] = useState(1);
  const componentRef = useRef<HTMLDivElement>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchParticipants();
    }
  }, [isAuthenticated]);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (data.session) {
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const fetchParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParticipants(data || []);
    } catch (err) {
      console.error('Erro ao buscar participantes:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'WhatsApp', 'Instagram', 'Código', 'Data de Registro'];
    const csvData = participants.map(p => [
      p.name,
      p.email,
      p.phone,
      p.instagram,
      p.purchase_code,
      new Date(p.created_at).toLocaleString('pt-BR')
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `participantes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerateCodes = async () => {
    setGeneratingCode(true);
    setError('');
    const newCodes: string[] = [];

    try {
      for (let i = 0; i < codeCount; i++) {
        let code;
        let isUnique = false;

        // Tenta gerar um código único
        while (!isUnique) {
          code = generateRandomCode();
          const { data, error } = await supabase
            .from('purchase_codes')
            .select('*')
            .eq('code', code);

          if (error) {
            throw error;
          }

          // Se não encontrou nenhum código igual, então é único
          if (!data || data.length === 0) {
            isUnique = true;
          }
        }

        // Insere o código no banco
        const { error: insertError } = await supabase
          .from('purchase_codes')
          .insert([{ 
            code: code,
            used: false,
            created_at: new Date().toISOString()
          }]);

        if (insertError) throw insertError;
        newCodes.push(code!);
      }

      setCodes(newCodes);
    } catch (err: any) {
      setError(err.message || 'Erro ao gerar códigos');
    } finally {
      setGeneratingCode(false);
    }
  };

  const downloadCodes = () => {
    if (codes.length === 0) return;

    const csvContent = [
      ['Código', 'Data de Geração'].join(','),
      ...codes.map(code => [code, new Date().toLocaleString('pt-BR')].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `codigos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handlePrint = useReactToPrint({
    documentTitle: 'Cupom Alfa Prime',
    onPrintError: (errorLocation: string, error: Error) => {
      console.error('Failed to print:', errorLocation, error);
    },
    contentRef: componentRef,
    pageStyle: `
      @page {
        size: 80mm auto !important;
        margin: 0mm !important;
        padding: 0mm !important;
      }
      @media print {
        html, body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          width: 80mm !important;
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          visibility: visible !important;
        }
        #print-content {
          display: block !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 80mm !important;
        }
        #print-content * {
          display: block !important;
        }
        #root > *:not(#print-content) {
          display: none !important;
        }
      }
    `,
    onAfterPrint: () => {
      setSelectedCode(null);
    }
  });

  const printCode = async (code: string) => {
    try {
      setSelectedCode(code);
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      
      if (componentRef.current && handlePrint) {
        handlePrint();
      } else {
        console.error('Printing component reference not found');
      }
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  const handleDeleteAllCodes = async () => {
    if (!window.confirm('Tem certeza que deseja excluir TODOS os códigos? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      setError('');
      const { error } = await supabase
        .from('purchase_codes')
        .delete()
        .neq('id', 0); // Deleta todos os registros

      if (error) throw error;
      
      // Limpa os códigos do estado
      setCodes([]);
      alert('Todos os códigos foram excluídos com sucesso!');
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir os códigos');
      console.error('Erro ao excluir códigos:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
          >
            <div>
              <h2 className="text-center text-3xl font-bold text-gray-900">
                Área Administrativa
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Senha</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Senha"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Entrar
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full sm:w-auto px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
            >
              Sair
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Geração de Códigos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                Gerar Códigos
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="codeCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade de Códigos
                  </label>
                  <input
                    type="number"
                    id="codeCount"
                    min="1"
                    value={codeCount}
                    onChange={(e) => setCodeCount(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerateCodes}
                  disabled={generatingCode}
                  className="w-full px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingCode ? 'Gerando...' : 'Gerar Códigos'}
                </motion.button>
              </div>
            </motion.div>

            {/* Lista de Códigos */}
            {codes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-lg space-y-4 col-span-1 sm:col-span-2 lg:col-span-3"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Códigos Gerados
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadCodes}
                      className="w-full sm:w-auto px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                    >
                      Baixar CSV
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteAllCodes}
                      className="w-full sm:w-auto px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                    >
                      Excluir Todos
                    </motion.button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {codes.map((code, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2"
                    >
                      <span className="font-mono text-lg">{code}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => printCode(code)}
                        className="w-full sm:w-auto px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg font-medium transition-colors"
                      >
                        Imprimir
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Lista de Participantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg space-y-4 col-span-1 sm:col-span-2 lg:col-span-3"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Participantes
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={exportToCSV}
                  className="w-full sm:w-auto px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                >
                  Exportar CSV
                </motion.button>
              </div>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Carregando participantes...</p>
                </div>
              ) : participants.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Nenhum participante registrado ainda.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          WhatsApp
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Instagram
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Código
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {participants.map((participant) => (
                        <tr key={participant.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {participant.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.instagram}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                            {participant.purchase_code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(participant.created_at).toLocaleString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Componente de impressão oculto */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          {selectedCode && <PrintableCoupon code={selectedCode} />}
        </div>
      </div>
    </div>
  );
} 