# Pokédex - PoekAPI

Uma aplicação web moderna de Pokédex que consulta dados da [PokeAPI](https://pokeapi.co/), permitindo explorar informações detalhadas sobre Pokémon.

## 📋 Sobre o Projeto

Este projeto é uma Pokédex completa desenvolvida em React com TypeScript, oferecendo uma experiência interativa para explorar o mundo dos Pokémon. A aplicação consome dados da PokeAPI para exibir informações detalhadas sobre cada Pokémon.

## ✨ Funcionalidades

### Visualização de Pokémon
- **Dados principais**: Exibe informações essenciais de cada Pokémon incluindo:
  - Flavor text (descrição)
  - Altura e peso
  - Habilidades
  - Tipos
  - Sprites (imagens padrão e shiny)
  - Cadeia de evolução completa e navegável

### Listagem e Navegação
- **Listagem navegável**: Carrossel com múltiplos Pokémon para exploração
- **Busca por nome**: Pesquisa rápida de Pokémon pelo nome
- **Navegação fluida**: Transições suaves entre páginas

### Sistema de Favoritos
- **Favoritar Pokémon**: Adicione seus Pokémon favoritos à sua lista pessoal
- **Página de favoritos**: Visualize todos os Pokémon favoritados em um único lugar
- **Acesso rápido**: Navegue facilmente entre a lista geral e seus favoritos

### Autenticação
- **Registro de usuário**: Crie sua conta personalizada
- **Login seguro**: Sistema de autenticação completo
- **Gerenciamento de sessão**: Contextos React para gerenciamento de estado de autenticação

### Interface e Experiência
- **Material UI**: Interface moderna e consistente usando Material-UI
- **Modo escuro e claro**: Alternância entre temas para melhor experiência visual
- **Design responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes React
- **React Router** - Roteamento para aplicações React
- **Context API** - Gerenciamento de estado global

## 🚀 Como Iniciar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd app
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo .env.example para .env
cp .env.example .env

# Edite o arquivo .env com os mesmos valores de .env.example
# (ou configure com seus próprios valores)
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Abra seu navegador em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Pokemons/       # Componentes relacionados a Pokémon
│   └── ...
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── contexts/           # Contextos React (Auth, etc)
├── types/              # Definições TypeScript
├── utils/              # Funções utilitárias
└── ...
```

## 🎨 Temas e Personalização

A aplicação suporta dois modos de tema:
- **Modo claro**: Interface clara e moderna
- **Modo escuro**: Interface escura para reduzir fadiga visual

O tema pode ser alternado através das configurações do usuário.

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- **Desktop**: Layout completo com sidebar lateral
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Barra de navegação inferior e layout otimizado para toque

## 🔐 Autenticação

O sistema de autenticação utiliza Context API para gerenciar:
- Estado de login/logout
- Tokens de acesso e refresh
- Informações do usuário autenticado
- Proteção de rotas

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run lint:fix` - Corrige erros de linting
- `npm run format` - Formata o código com Prettier
