import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Termos e Condições do Sorteio
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Regras do Sorteio
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">O sorteio é válido apenas para clientes que realizarem compras na Alfa Prime até o dia 31/12/2024.</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">O sorteio será realizado no dia 01/01/2025.</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">O prêmio é um celular (smartphone).</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">Cada compra dá direito a um código único de participação.</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">O código é intransferível e só pode ser utilizado uma única vez.</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">Para participar é necessário:</p>
              <ul className="ml-4 space-y-2">
                <li>- Seguir @alfa.prime_ no Instagram</li>
                <li>- Marcar 3 amigos no post do sorteio</li>
                <li>- Compartilhar o post nos stories</li>
                <li>- Ter perfil público no Instagram</li>
              </ul>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">Funcionários da Alfa Prime não podem participar do sorteio.</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">O prêmio não pode ser convertido em dinheiro.</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">O vencedor será contatado através dos dados fornecidos no cadastro.</p>
            </li>
            <li className="flex items-start">
              <span className="h-6 flex items-center sm:h-7">
                <svg className="flex-shrink-0 h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="ml-2">O prêmio deverá ser retirado na Alfa Prime em até 30 dias após o sorteio.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Política de Privacidade
          </h2>
          <p className="text-gray-600">
            Ao participar do sorteio, você concorda com a coleta e uso dos seus dados
            pessoais de acordo com esta política de privacidade.
          </p>
        </section>
      </motion.div>
    </div>
  );
} 