<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">📺 TV Show Tracker API</h1>
<p align="center">GraphQL API built with NestJS, PostgreSQL, and TypeORM. Manage shows, actors, episodes, and favorite lists. Includes RGPD compliance & testing suite.</p>

---

## 🚀 Features

- ✅ **GraphQL API** with Apollo Server
- 👥 **Users** with authentication via JWT
- 🎬 **Shows**, **Actors**, and **Episodes** with full CRUD
- ❤️ Users can **add/remove favorite shows**
- 🔎 **Pagination, filtering, and sorting** by title, genre, and type
- 🛡️ **Guards (JWT)** and custom decorators for user access
- 🧪 **Unit & Integration tests** (Jest + Supertest)
- 🧹 **Seeding** support with users, actors, shows, and episodes
- 📄 **RGPD compliance**: data export (CSV) & account deletion

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lucasninaturtle/tv-show-tracker.git
cd tv-show-tracker-api
```

### 2. Setup environment variables

```bash
cp .env.template .env
```

Update `.env` with your database credentials (or use the default Docker ones).

### 3. Install dependencies

```bash
yarn install
```

### 4. Start PostgreSQL (via Docker)

```bash
docker compose up -d
```

This will launch a PostgreSQL instance on port `5499`.

### 5. Run the backend

```bash
yarn start:dev
```

Visit the GraphQL Playground:

```
http://localhost:3000/graphql
```

---

## 🌱 Seeding the database

Populate your database with sample data (users, shows, actors, episodes):

```bash
curl -X POST http://localhost:3000/graphql   -H "Content-Type: application/json"   -d '{"query":"mutation { executeSeed }"}'
```

⚠️ Seed will not run in production mode.

---

## 🔐 Auth

- All main queries & mutations are protected with JWT
- To access them:
  - Register or login via the auth mutation
  - Include the token in the `Authorization` header as `Bearer <token>`

---

## ⚙️ Scripts

### Run unit & integration tests

```bash
yarn test
```

You can also run specific test files with:

```bash
yarn test <path-to-file>
```

---

## 🧪 Testing

- ✅ Unit tests (e.g. `shows.service.spec.ts`)
- ✅ End-to-end tests (e.g. `test/shows.e2e-spec.ts`)
- ✅ Guards mocked to simplify integration
- ✅ Authenticated test context

---

## 🔐 RGPD Compliance

- ✅ **Right to be forgotten** — `deleteAccount(userId)`
- ✅ **Right to access** — `exportUserData(userId)` exports CSV
- 🔐 Secured by token for authenticated users

---

## 🧭 API Highlights

### Example Query

```graphql
query {
  shows(offset: 0, limit: 10, search: "lord", genre: FANTASY, sortOrder: ASC) {
    id
    title
    genre
    type
    actors {
      name
    }
  }
}
```

### Example Mutation

```graphql
mutation {
  addFavorite(showId: "uuid-here") {
    id
    fullName
    favorites {
      title
    }
  }
}
```

---

## 📁 Project Structure

```
src/
  ├── auth/
  ├── shows/
  ├── users/
  ├── actor/
  ├── episode/
  ├── seed/
  └── common/
```

Organized by domain, following NestJS & SOLID principles.

---

## 🛠️ Tech Stack

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Docker](https://www.docker.com/)

---

## 👨‍💻 Author

Made with ❤️ by [@lucasninjaturtle](https://github.com/lucasninjaturtle)