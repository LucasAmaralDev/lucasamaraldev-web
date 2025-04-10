# Sistema Multi-Usuários de Portfólios

Este projeto é uma plataforma onde usuários podem se cadastrar e criar seus próprios portfólios online. Foi desenvolvido utilizando Next.js, TypeScript, TypeORM e PostgreSQL.

## Funcionalidades

- Cadastro e login de usuários
- Painel de controle para gerenciamento de portfólios
- Criação de múltiplos portfólios por usuário
- Personalização completa de cada portfólio
- Páginas públicas para visualização dos portfólios

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js com API Routes do Next.js
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Autenticação**: JWT

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)

## Configuração do Ambiente

1. Clone o repositório:

```bash
git clone https://seu-repositorio/meu-portfolio.git
cd meu-portfolio
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

   - Copie o arquivo `.env.example` para `.env`
   - Preencha as informações de conexão com o banco de dados e a chave secreta do JWT

4. Execute as migrations do banco de dados:

```bash
npm run typeorm migration:run
```

5. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Migrations do Banco de Dados

Para criar novas migrations:

```bash
npm run typeorm migration:generate -- -n nome-da-migracao
```

Para executar as migrations:

```bash
npm run typeorm migration:run
```

## Estrutura do Projeto

- `/src/pages` - Páginas da aplicação e APIs
- `/src/components` - Componentes React reutilizáveis
- `/src/database` - Configuração do banco de dados, entidades e migrations
- `/src/interfaces` - Interfaces TypeScript
- `/src/css` - Arquivos de estilo

## Contribuindo

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um Pull Request.
