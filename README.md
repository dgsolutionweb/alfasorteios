# Sistema de Sorteio - Loja

Sistema de gerenciamento de sorteio desenvolvido com Vite, React, TypeScript e Supabase.

## Funcionalidades

- Landing page com informações do prêmio e contador regressivo
- Sistema de cadastro de participantes com validação de códigos
- Painel administrativo para gerenciamento de participantes
- Geração de códigos únicos para distribuição
- Exportação de dados em CSV
- Sistema de sorteio aleatório
- Interface responsiva e moderna

## Requisitos

- Node.js 14+
- NPM ou Yarn
- Conta no Supabase

## Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Execute os seguintes comandos SQL para criar as tabelas necessárias:

```sql
-- Participants table
create table participants (
  id bigint primary key generated always as identity,
  code text not null unique,
  full_name text not null,
  email text not null,
  phone text,
  instagram text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Raffle codes table
create table raffle_codes (
  id bigint primary key generated always as identity,
  code text not null unique,
  used boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Winners table
create table winners (
  id bigint primary key generated always as identity,
  participant_id bigint references participants(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

4. Copie as credenciais do projeto (URL e Anon Key)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd [nome-do-repositorio]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis com suas credenciais do Supabase:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Uso

### Página Inicial
- Exibe informações sobre o prêmio
- Mostra o tempo restante para o sorteio
- Permite acesso ao formulário de cadastro

### Cadastro de Participantes
- Formulário para inserção do código do sorteio
- Validação em tempo real dos dados
- Confirmação de cadastro com número de participação

### Painel Administrativo
- Acesso protegido por autenticação
- Lista de todos os participantes
- Filtros de busca
- Exportação de dados
- Geração de códigos para distribuição
- Sistema de sorteio

## Desenvolvimento

### Estrutura do Projeto
```
src/
  ├── components/     # Componentes reutilizáveis
  ├── pages/         # Páginas da aplicação
  ├── lib/           # Configurações e utilitários
  ├── utils/         # Funções auxiliares
  └── types/         # Definições de tipos TypeScript
```

### Scripts Disponíveis
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão de produção
- `npm run preview`: Visualiza a versão de produção localmente

## Segurança

- Autenticação gerenciada pelo Supabase
- Validação de códigos únicos
- Proteção contra duplicidade de participação
- Dados sensíveis armazenados de forma segura

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Crie um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
