import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';

// Set the specific end date for the raffle (January 1st, 2025)
const endDate = new Date('2025-01-01T23:59:59');

export default function Home() {
  return (
    <div className="space-y-16 pb-8">
      {/* Hero Section with Background */}
      <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center px-4 py-16 sm:px-6 lg:px-8"
        >
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6"
          >
            Ganhe um <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse">Prêmio Incrível</span>
          </motion.h1>
          <div className="max-w-2xl mx-auto">
            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-100">
              Participe do mega sorteio da Alfa Prime! Faça suas compras em nossa loja 
              e concorra a um prêmio surpreendente que será revelado no dia do sorteio.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/register"
                  className="w-full inline-flex justify-center items-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 ease-in-out"
                >
                  Participar Agora
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="#como-participar"
                  className="w-full inline-flex justify-center items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  Saiba Mais
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8 -mt-20 shadow-2xl relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Tempo Restante para o Sorteio
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">Sorteio será realizado em 01/01/2025</p>
          </motion.div>
          <div className="mt-8">
            <Countdown
              date={endDate}
              renderer={({ days, hours, minutes, seconds }) => (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-lg border border-indigo-100"
                  >
                    <div className="text-4xl sm:text-5xl font-bold text-indigo-600">{days}</div>
                    <div className="text-sm sm:text-base font-medium text-gray-600 mt-2">Dias</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-lg border border-indigo-100"
                  >
                    <div className="text-4xl sm:text-5xl font-bold text-indigo-600">{hours}</div>
                    <div className="text-sm sm:text-base font-medium text-gray-600 mt-2">Horas</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-lg border border-indigo-100"
                  >
                    <div className="text-4xl sm:text-5xl font-bold text-indigo-600">{minutes}</div>
                    <div className="text-sm sm:text-base font-medium text-gray-600 mt-2">Minutos</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-lg border border-indigo-100"
                  >
                    <div className="text-4xl sm:text-5xl font-bold text-indigo-600">{seconds}</div>
                    <div className="text-sm sm:text-base font-medium text-gray-600 mt-2">Segundos</div>
                  </motion.div>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Prize Showcase */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Prêmio Surpresa
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="text-xl">
                  Prepare-se para uma surpresa incrível! O prêmio será revelado apenas 
                  no dia do sorteio, mas garantimos que será algo especial e muito desejado.
                </p>
                <ul className="space-y-4 mt-6">
                  <li>Prêmio Exclusivo</li>
                  <li>Produto Premium</li>
                  <li>Alta Qualidade</li>
                  <li>Design Moderno</li>
                  <li>Garantia de Fábrica</li>
                </ul>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  Quero Participar
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="w-full h-96 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center p-8">
                  <div className="text-white text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 mx-auto mb-6"
                    >
                      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5 4.20996L12 6.80996L16.5 4.20996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5 19.79V14.6L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12L16.5 14.6V19.79" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.27002 6.95996L12 12.01L20.73 6.95996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">Prêmio Surpresa</h3>
                    <p className="text-lg opacity-90">
                      Aguarde a revelação no dia do sorteio!
                    </p>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-lg -z-10"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How to Participate */}
      <div id="como-participar" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-12">
              Como Participar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Siga no Instagram</h3>
                <p className="text-gray-600 mb-4">
                  Siga @alfa.prime_ no Instagram
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://instagram.com/alfa.prime_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Seguir agora
                </motion.a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Marque 3 Amigos</h3>
                <p className="text-gray-600 mb-4">
                  Marque 3 amigos nos comentários do post do sorteio
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://instagram.com/alfa.prime_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  Ver post
                </motion.a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Compartilhe nos Stories</h3>
                <p className="text-gray-600 mb-4">
                  Compartilhe o post do sorteio nos seus stories e marque @alfa.prime_
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://instagram.com/alfa.prime_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartilhar
                </motion.a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4">Faça uma Compra</h3>
                <p className="text-gray-600">
                  Visite a Alfa Prime e faça uma compra de qualquer valor
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  5
                </div>
                <h3 className="text-xl font-semibold mb-4">Receba seu Código</h3>
                <p className="text-gray-600">
                  Você receberá um código único no seu comprovante de compra
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  6
                </div>
                <h3 className="text-xl font-semibold mb-4">Cadastre-se</h3>
                <p className="text-gray-600">
                  Use o código para se cadastrar no sorteio através do nosso site
                </p>
              </motion.div>
            </div>

            {/* Regras Adicionais */}
            <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Regras Importantes</h3>
              <ul className="text-left max-w-2xl mx-auto space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Você deve estar seguindo @alfa.prime_ no Instagram
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Marcar 3 amigos diferentes nos comentários do post do sorteio
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Compartilhar o post do sorteio nos seus stories e marcar @alfa.prime_
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Seu perfil deve estar público durante o período do sorteio
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Manter todas as interações até o dia do sorteio
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Media */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl mx-4 sm:mx-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-8">
            Siga-nos nas Redes Sociais
          </h2>
          <div className="flex justify-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://instagram.com/alfa.prime_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @alfa.prime_
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 