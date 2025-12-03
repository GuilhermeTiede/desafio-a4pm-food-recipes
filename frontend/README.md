# Frontend Vue 3 + Autenticação

Template de frontend Vue 3 com sistema de autenticação similar ao Laravel Breeze, usando shadcn-vue.

## Tecnologias

- **Vue 3** - Framework progressivo
- **Vue Router** - Roteamento
- **Pinia** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilização
- **Vite** - Build tool

## Estrutura do Projeto

```
src/
├── components/
│   └── ui/           # Componentes UI (Button, Input, Card, Label)
├── layouts/          # Layouts (Guest, Authenticated)
├── router/           # Configuração de rotas
├── stores/           # Pinia stores (auth)
├── services/         # Serviços API (axios)
├── views/            # Páginas
│   ├── auth/         # Páginas de autenticação (Login, Register)
│   └── Dashboard.vue
└── styles/           # Estilos globais
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure a URL da API no arquivo `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Rotas Disponíveis

- `/login` - Página de login
- `/register` - Página de registro
- `/dashboard` - Dashboard (requer autenticação)

## Sistema de Autenticação

O sistema de autenticação está configurado para trabalhar com uma API Node.js que deve ter os seguintes endpoints:

### Endpoints Esperados

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Resposta:
```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

**POST /api/auth/register**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

Resposta: (mesma do login)

**GET /api/auth/user**
Headers: `Authorization: Bearer {token}`

Resposta:
```json
{
  "id": 1,
  "name": "User Name",
  "email": "user@example.com"
}
```

**POST /api/auth/logout**
Headers: `Authorization: Bearer {token}`

## Características

### Guards de Rota
- Rotas protegidas redirecionam para `/login` se não autenticado
- Usuários autenticados são redirecionados para `/dashboard` ao acessar páginas de guest

### Interceptors Axios
- Adiciona automaticamente o token JWT em todas as requisições
- Redireciona para login em caso de erro 401 (não autorizado)

### Armazenamento
- Token JWT armazenado no `localStorage`
- Persistência de autenticação entre recarregamentos

## Componentes UI

Todos os componentes seguem o padrão do shadcn-vue:

- **Button** - Botão com variantes (default, outline, ghost, link, destructive)
- **Input** - Campo de entrada de texto
- **Label** - Label para formulários
- **Card** - Container com header e footer opcionais

## Próximos Passos

1. Configure o backend Node.js com os endpoints de autenticação
2. Personalize os componentes e estilos conforme necessário
3. Adicione novas funcionalidades e páginas

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
```
