# 🍳 Sistema de Gerenciamento de Receitas - A4PM

> Desenvolvido por Guilherme Dias Tiede como parte do processo seletivo para Desenvolvedor Full Stack / Tech Lead na A4PM - Soluções Inteligentes.

## 📋 Sobre o Projeto

Este é um sistema completo de gerenciamento de receitas culinárias, desenvolvido com foco em **boas práticas de desenvolvimento**, **arquitetura escalável** e **experiência do usuário**. O projeto foi construído seguindo os princípios de **Clean Code** e **convenções de commits semânticos**.

### 🎨 Design e Identidade Visual

A interface foi cuidadosamente desenvolvida pensando na **identidade visual da A4PM**, utilizando:
- **Paleta de cores**: Laranja (#FF8C00) como cor primária, refletindo a energia e criatividade da marca
- **Tons de azul**: Para elementos secundários e criar contraste profissional
- **Design moderno**: Interface limpa e intuitiva com componentes reutilizáveis
- **Responsividade**: Layout adaptável para diferentes dispositivos

### 🚀 Tecnologias Utilizadas

#### Backend
- **Node.js** com **Express** - API RESTful robusta e performática
- **MySQL 8.0** - Banco de dados relacional com modelagem normalizada
- **JWT** - Autenticação stateless e segura
- **Bcrypt** - Hash de senhas com salt rounds
- **Swagger/OpenAPI** - Documentação interativa da API
- **Docker** - Containerização para ambiente consistente

#### Frontend
- **Vue 3** (Composition API) - Framework progressivo e reativo
- **Vite** - Build tool moderna e extremamente rápida
- **Pinia** - Gerenciamento de estado intuitivo
- **Vue Router** - Navegação com guards de autenticação
- **Tailwind CSS** - Estilização utilitária e responsiva
- **Axios** - Cliente HTTP com interceptors

#### DevOps
- **Docker Compose** - Orquestração de múltiplos containers
- **Hot Reload** - Desenvolvimento ágil com nodemon e Vite HMR
- **Volumes** - Persistência de dados e sincronização de código

## ⚡ Início Rápido

### Pré-requisitos

- Docker Desktop instalado e em execução
- Portas 3000, 3306 e 5173 disponíveis

### Instalação e Execução

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd desafio-a4pm-food-recipes
```

2. **Suba os containers**
```bash
docker compose up --build
```

O comando acima irá:
- Criar e inicializar o banco de dados MySQL
- Executar o script SQL com a estrutura e dados iniciais
- Subir o backend na porta 3000
- Subir o frontend na porta 5173

3. **Acesse o sistema**
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **API**: [http://localhost:3000](http://localhost:3000)
- **Documentação Swagger**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Desenvolvimento Local

Os containers estão configurados com **hot-reload automático**:
- Alterações no backend são detectadas pelo **nodemon**
- Alterações no frontend são detectadas pelo **Vite HMR**
- Não é necessário rebuild dos containers durante o desenvolvimento

## ✅ Funcionalidades Implementadas

### Autenticação
- ✅ Cadastro de usuário com validação de dados
- ✅ Login com JWT e sessão persistente
- ✅ Logout com limpeza de token
- ✅ Proteção de rotas autenticadas
- ✅ Renovação automática de sessão

### Gerenciamento de Receitas
- ✅ Listagem de receitas do usuário autenticado
- ✅ Busca e filtros de receitas
- ✅ Cadastro de novas receitas com categorias
- ✅ Edição de receitas existentes
- ✅ Exclusão de receitas
- ✅ Visualização detalhada de receitas
- ✅ Funcionalidade de impressão (window.print)

### Recursos Adicionais
- ✅ Dashboard com visão geral e estatísticas
- ✅ Categorias de receitas pré-cadastradas
- ✅ Feedback visual de operações (loading, erros, sucesso)
- ✅ Interface responsiva e acessível
- ✅ Validação de formulários no frontend e backend

### 🌟 Funcionalidades Extras (Não Solicitadas no Teste)

> **Nota**: As funcionalidades abaixo foram implementadas para demonstrar conhecimento adicional em arquitetura e boas práticas de desenvolvimento, mesmo não sendo requisitos do teste.

#### Sistema de Favoritos
- ✅ Marcar receitas como favoritas
- ✅ Listar todas as receitas favoritas
- ✅ Remover receitas dos favoritos
- ✅ Indicador visual de receitas favoritadas

#### Sistema de Avaliações
- ✅ Avaliar receitas com notas de 1 a 5 estrelas
- ✅ Adicionar comentários nas avaliações
- ✅ Visualizar média de avaliações por receita
- ✅ Listar todas as avaliações de uma receita
- ✅ Atualizar ou remover avaliações próprias

#### Busca Avançada
- ✅ Busca por texto (nome, ingredientes, modo de preparo)
- ✅ Filtro por categoria
- ✅ Ordenação customizável (data, nome, avaliação)
- ✅ Índice FULLTEXT para performance

#### Arquitetura Avançada
- ✅ **Camada de Models**: Separação clara da lógica de negócio
- ✅ **Sistema de Migrations**: Versionamento e controle do schema do banco
- ✅ **Padrão Repository**: Encapsulamento de acesso a dados
- ✅ **Queries Otimizadas**: JOINs, agregações e índices
- ✅ **Estatísticas em Tempo Real**: Contadores e médias calculadas

Estas funcionalidades demonstram:
- Capacidade de ir além dos requisitos
- Conhecimento em arquitetura de software escalável
- Experiência com features comuns em sistemas reais
- Preocupação com performance e manutenibilidade

## 📁 Estrutura do Projeto

```
desafio-a4pm-food-recipes/
├── backend/
│   ├── src/
│   │   ├── config/         # Configurações (DB, Swagger)
│   │   ├── controllers/    # Lógica de requisição/resposta
│   │   ├── models/         # Models (User, Recipe, Category)
│   │   ├── migrations/     # Migrations do banco de dados
│   │   ├── middlewares/    # Auth, validações
│   │   ├── routes/         # Definição de rotas
│   │   └── index.js        # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── layouts/        # Layouts (Auth, Guest)
│   │   ├── router/         # Configuração de rotas
│   │   ├── services/       # API client (Axios)
│   │   ├── stores/         # Estado global (Pinia)
│   │   ├── styles/         # CSS global
│   │   └── views/          # Páginas da aplicação
│   ├── Dockerfile
│   └── package.json
│
├── banco/
│   ├── script.sql          # Schema e dados iniciais
│   ├── model.pdf           # Diagrama do banco
│   └── diagrama DER.mwb    # Modelo MySQL Workbench
│
└── docker-compose.yml      # Orquestração dos serviços
```

## 🗄️ Banco de Dados

O banco de dados foi modelado seguindo as **boas práticas de normalização** e contém:

### Tabelas
- **usuarios**: Dados dos usuários com autenticação
- **receitas**: Receitas cadastradas pelos usuários
- **categorias**: Categorias pré-definidas (13 categorias)
- **favoritos**: Receitas favoritadas pelos usuários (nova)
- **avaliacoes**: Avaliações e comentários de receitas (nova)

### Relacionamentos
- Receitas pertencem a um usuário (1:N)
- Receitas podem ter uma categoria (N:1, opcional)
- Favoritos relacionam usuários e receitas (N:M)
- Avaliações relacionam usuários e receitas (N:M com nota e comentário)
- Constraints de integridade referencial e CASCADE
- Índices FULLTEXT para busca rápida

A pasta `banco/` contém o diagrama DER completo e o script SQL para criação automática.

## 📚 Documentação da API

A API está totalmente documentada com **Swagger/OpenAPI 3.0**, disponível em:

**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

### Principais Endpoints

#### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/user` - Dados do usuário autenticado
- `POST /api/auth/logout` - Logout

#### Receitas
- `GET /api/receitas` - Listar receitas do usuário
- `GET /api/receitas/:id` - Buscar receita específica
- `POST /api/receitas` - Criar nova receita
- `PUT /api/receitas/:id` - Atualizar receita
- `DELETE /api/receitas/:id` - Deletar receita

#### Categorias
- `GET /api/receitas/categorias` - Listar todas as categorias com estatísticas

#### Favoritos (Novo)
- `GET /api/receitas/favoritos/list` - Listar receitas favoritas
- `POST /api/receitas/:id/favorito` - Adicionar aos favoritos
- `DELETE /api/receitas/:id/favorito` - Remover dos favoritos

#### Avaliações (Novo)
- `GET /api/receitas/:id/avaliacoes` - Listar avaliações de uma receita
- `POST /api/receitas/:id/avaliar` - Avaliar receita (nota 1-5 + comentário)
- `DELETE /api/receitas/:id/avaliar` - Remover avaliação

#### Query Parameters
- `?search=texto` - Busca por texto em nome, ingredientes e modo de preparo
- `?categoryId=1` - Filtra por categoria
- `?sortBy=criado_em` - Ordena resultados
- `?sortOrder=DESC` - Ordem crescente/decrescente

Todas as rotas de receitas requerem **autenticação via Bearer Token (JWT)**.

## 🔒 Segurança

Implementações de segurança aplicadas:

- ✅ Senhas hasheadas com **bcrypt** (10 salt rounds)
- ✅ Tokens JWT com expiração configurável
- ✅ Validação de dados no backend e frontend
- ✅ Proteção contra SQL Injection (prepared statements)
- ✅ CORS configurado adequadamente
- ✅ Variáveis sensíveis em arquivos .env
- ✅ .gitignore para prevenir commit de credenciais
- ✅ Verificação de propriedade de recursos (usuário só acessa suas receitas)

## 🎯 Diferenciais Implementados

- ✅ **Docker e Docker Compose** - Ambiente padronizado e fácil deploy
- ✅ **Documentação Swagger** - API totalmente documentada
- ✅ **Arquitetura Limpa** - Separação de responsabilidades (MVC)
- ✅ **Commits Semânticos** - Histórico organizado e profissional
- ✅ **Componentização** - Componentes reutilizáveis no frontend
- ✅ **Estado Global** - Gerenciamento com Pinia
- ✅ **Interceptors HTTP** - Automação de autenticação
- ✅ **Error Handling** - Tratamento consistente de erros
- ✅ **Loading States** - Feedback visual durante operações
- ✅ **Responsive Design** - Interface adaptável

## 📝 Observações sobre o Repositório

> **Nota sobre Timestamps dos Commits**: Os commits apresentam horários próximos devido à **migração de repositório**. Durante o desenvolvimento, o projeto foi construído incrementalmente seguindo as boas práticas de commits atômicos e mensagens descritivas. A migração para este repositório preservou a ordem lógica do desenvolvimento, mas consolidou os timestamps.

O histórico de commits reflete o **fluxo real de desenvolvimento**, com cada commit representando uma funcionalidade ou melhoria específica:

1. Configuração inicial (Docker, estrutura base)
2. Backend (API, autenticação, CRUD)
3. Documentação (Swagger)
4. Frontend (UI, rotas, estado)
5. Finalização (assets, documentação)

## 🚀 Próximos Passos (Melhorias Futuras)

- Implementação de testes unitários e E2E (Jest, Cypress)
- CI/CD com GitHub Actions
- Paginação de receitas
- Upload de imagens das receitas
- Sistema de favoritos
- Compartilhamento de receitas entre usuários
- PWA para uso offline
- Logs estruturados com Winston
- Rate limiting na API

## 👨‍💻 Sobre o Desenvolvimento

Este projeto foi desenvolvido com dedicação e atenção aos detalhes, buscando demonstrar não apenas competência técnica, mas também:

- **Visão de produto**: Interface pensada para o usuário final
- **Qualidade de código**: Código limpo, comentado e manutenível
- **Documentação**: Facilita onboarding de novos desenvolvedores
- **Boas práticas**: Seguindo padrões da indústria
- **Escalabilidade**: Arquitetura preparada para crescimento

Estou entusiasmado com a oportunidade de contribuir com a **A4PM - Soluções Inteligentes** e aplicar minha experiência em projetos reais que gerem valor para a empresa e seus clientes.

---

Desenvolvido com 💜 por **Guilherme Dias Tiede**

Para dúvidas ou discussões técnicas sobre o projeto, estou à disposição!
