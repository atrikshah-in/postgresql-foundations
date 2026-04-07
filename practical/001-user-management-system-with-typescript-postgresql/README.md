# User Management System (CRUD APIs with Node.js, PostgreSQL, TypeScript)

This project is a practical task demonstrating how to build a User Management System (CRUD APIs) using Node.js, Express, PostgreSQL, and deeply integrating important TypeScript concepts.

## 🌟 Concepts Used

### Database
- **PostgreSQL Connection Pooling**: We used the `pg` driver to create a `Pool` to cleanly handle multiple connections avoiding overhead.
- **Parametrized SQL Queries**: Mitigates SQL injection risks (e.g. `$1, $2`).
- **`COALESCE`**: In raw SQL updates, we use `COALESCE` to elegantly handle missing payload values falling back to old table data.
- **Auto-Initialization**: A script evaluates table creation on startup.

### TypeScript Important Topics Embedded
1. **Interfaces**: Created standard contracts for our users and standardizing HTTP JSON responses. By giving strict structure, TypeScript statically detects field omissions. (`IUser`)
2. **Enums**: Grouped standardized constants using Enums (`UserRole`, `UserStatus`) ensuring users can only be passed predetermined valid strings (e.g., `ADMIN`, `ACTIVE`).
3. **Utility Types**:
   - `Omit<Type, Keys>`: Derived `CreateUserDTO` perfectly from `IUser` omitting un-provided system keys (`id`, `created_at`, `updated_at`). 
   - `Partial<Type>`: Modeled `UpdateUserDTO` off `CreateUserDTO` converting all parameters strictly optionally cleanly to support HTTP PATCH/PUT routines.
4. **Generics**: Crafted a reusable `ApiResponse<T>` contract. Any handler controller dynamically injects its payload `T` allowing intelligent type-safe front-end consumers.
5. **Express Type Bindings**: Augmented standard Express `Request`, `<{Params}, {ResBody}, {ReqBody}>` and generic `Response` correctly formatting server interaction.

## 🚀 How to Run and Test

### 1. Prerequisites
- Node.js installed (v16+)
- PostgreSQL Database locally installed and running on port `5432`

### 2. Setup environment variables
A standard `.env` file is included, alter if necessary.
By default:
- PORT = `3000`
- PG DB defaults (`username`: `postgres`, `password`: `admin`, `database`: `postgres`)

### 3. Installation
Navigate to your project directory, then run:

```bash
npm install
```

### 4. Running the Dev Server
Hot reload server configuration using `.ts` and `nodemon`.

```bash
npm run dev
```

Server should announce:
`[server]: Server is running at http://localhost:3000`
`🔗 Connected to the PostgreSQL database.`
`✅ Users table initialized successfully.`

### 5. API Testing Routes (CRUD Endpoints)

You can consume these endpoints via Postman or `cURL`:
Base URL: `http://localhost:3000/api`

- **Create User** [POST] `/users`
  `Body`: `{ "username": "John Doe", "email": "john@email.com", "role": "ADMIN", "status": "ACTIVE" }`
  
- **Get All Users** [GET] `/users`
- **Get User By ID** [GET] `/users/:id`
- **Update User** [PUT] `/users/:id`
  `Body` (Partial): `{ "status": "BANNED" }`
- **Delete User** [DELETE] `/users/:id`

## 🛠 Features
- Statically tested robust endpoints
- Complete asynchronous controller logic paired with `pg` guarantees non-blocking queries. 
- Graceful API error propagation
