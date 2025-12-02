# 📘 NestJS Enterprise API — Clean Architecture + JWT + PostgreSQL

This project is a **production-ready Enterprise REST API** built with **NestJS**, following **modular architecture** similar to Spring Boot.

It includes:

* 🟦 Enterprise folder/module structure
* 🟦 PostgreSQL + TypeORM integration
* 🟦 User CRUD module
* 🟦 JWT Authentication for secured endpoints
* 🟦 Password hashing with bcrypt
* 🟦 DTO validation (class-validator)
* 🟦 Swagger API documentation with examples
* 🟦 TypeScript first-class coding
* 🟦 Clean coding standards, scalable and maintainable

---

## 🏗 1. Technology Stack

| Layer            | Technology      |
| ---------------- | --------------- |
| Runtime          | Node.js         |
| Framework        | NestJS          |
| Language         | TypeScript      |
| Database         | PostgreSQL      |
| ORM              | TypeORM         |
| Authentication   | JWT             |
| Password Hashing | bcrypt          |
| Validation       | class-validator |
| API Docs         | Swagger UI      |

---

## 📂 2. Folder Structure

```
src/
 ├── config/
 │     └── typeorm.config.ts       # DB connection
 ├── modules/
 │     ├── user/
 │     │    ├── dto/
 │     │    │    ├── create-user.dto.ts
 │     │    │    └── update-user.dto.ts
 │     │    ├── user.controller.ts
 │     │    ├── user.service.ts
 │     │    ├── user.entity.ts
 │     │    └── user.module.ts
 │     └── auth/
 │          ├── auth.controller.ts
 │          ├── auth.service.ts
 │          ├── jwt.strategy.ts
 │          ├── jwt-auth.guard.ts
 │          └── auth.module.ts
 ├── app.module.ts
 └── main.ts
```

---

## ⚙️ 3. Prerequisites

* Node.js (v18+)
* PostgreSQL

Database configuration (default):

```
username: postgres
password: postgres
database: nestdb
```

* Nest CLI:

```bash
npm install -g @nestjs/cli
```

---

## 🚀 4. Installation & Running

1. Clone the repo and go inside project:

```bash
git clone <repo-url>
cd nest-enterprise-api
```

2. Install dependencies:

```bash
npm install
```

3. Create PostgreSQL database:

```sql
CREATE DATABASE nestdb;
```

4. Start the server:

```bash
npm run start:dev
```

Server runs at: `http://localhost:3000`

---

## 📄 5. API Documentation (Swagger)

Swagger UI is available at:
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

Features:

* Request examples from DTOs
* Response examples from DTOs
* JWT Bearer auth support

---

## 👤 6. User Module

* **Controller** → Handles REST endpoints (`POST /users`, `GET /users`, `DELETE /users/:id`)
* **Service** → Business logic
* **Entity** → TypeORM entity mapping
* **DTOs** → Validation + Swagger examples
* **JWT Protection** → Secure routes using `@UseGuards(JwtAuthGuard)`

---

## 🔐 7. JWT Authentication

* Login: `POST /auth/login` → returns `access_token`
* Protected routes require: `Authorization: Bearer <token>`
* Passwords are hashed with `bcrypt`
* Example DTOs for login and responses are provided for Swagger

---

## 🛠 8. Example Requests

### Create User

```http
POST /users
Content-Type: application/json

{
  "username": "ravi",
  "email": "ravi@example.com",
  "password": "Secret@123"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "ravi@example.com",
  "password": "Secret@123"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Users (Protected)

```http
GET /users
Authorization: Bearer <access_token>
```

---

## 🧪 9. Validation

* NestJS uses `class-validator` (like Spring Boot `@Valid`)
* Example DTO field decorators:

```ts
@ApiProperty({ example: 'ravi@example.com' })
@IsEmail()
email: string;

@ApiProperty({ example: 'Secret@123' })
@MinLength(6)
password: string;
```

Swagger will automatically show these examples.

---

## 🗄 10. Database Configuration

`src/config/typeorm.config.ts`:

```ts
export const typeOrmConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestdb',
  entities: [User],
  synchronize: true, // dev only
};
```

---

## 🏛 11. Architecture Analogy (Spring Boot → NestJS)

| Spring Boot            | NestJS                                     |
| ---------------------- | ------------------------------------------ |
| Package                | Module                                     |
| @RestController        | @Controller                                |
| @Service               | @Injectable service                        |
| Repository             | TypeORM repository via `@InjectRepository` |
| Entity                 | Entity Class                               |
| DTO + Validation       | DTO + `class-validator`                    |
| application.properties | typeorm.config.ts                          |
| Swagger                | @nestjs/swagger + decorators               |
| BCryptPasswordEncoder  | bcrypt                                     |

---

## 🎯 12. Best Practices

* Keep module boundaries clear (`UserModule`, `AuthModule`, etc.)
* Use DTOs for all request/response
* Protect sensitive endpoints with JWT
* Keep secrets in `.env` (use `@nestjs/config`)
* Add Swagger examples for every DTO field
* Keep folder structure clean, like Spring Boot packages

---

## 🔮 13. Future Enhancements

* Refresh token flow
* Role-based authorization (RBAC)
* Global exception filters
* Logging with `winston`
* Docker + docker-compose
* Unit + e2e testing
* Environment variable management with `@nestjs/config`

---
## 🎉 14. Email Sending

* to send email first we need to install bellow libraries using bellow comand
* npm install nodemailer @nestjs/config nodemailer-express-handlebars
* npm install --save-dev @types/nodemailer


# NestJS Authentication Project
This project demonstrates a **complete authentication system** in NestJS with:

1. **Email/Password Login**
2. **Google OAuth Login**
3. **JWT Token Issuance**
4. **User Management (Database)**

We will explain **step by step** how everything works, what to install, and how data flows.

---

## **1️⃣ Prerequisites**

Before starting, make sure you have:

- Node.js >= 18 installed
- PostgreSQL / MySQL database running (or any DB TypeORM supports)
- NestJS CLI installed globally (optional):
```bash
npm install -g @nestjs/cli

# NestJS + TypeORM + database driver
npm install @nestjs/typeorm typeorm pg  # use 'mysql2' if using MySQL

# JWT Authentication
npm install @nestjs/jwt passport-jwt passport

# Google OAuth
npm install @nestjs/passport passport-google-oauth20

# Password hashing
npm install bcrypt
npm install --save-dev @types/bcrypt

# Environment variables
npm install @nestjs/config





## 🎉 14. Summary

This project is a **clean, modular, enterprise-ready NestJS backend**:

* Postgres database integration
* TypeORM ORM
* User CRUD with JWT authentication
* Swagger documentation with examples
* Password hashing
* Clean folder structure and modularity
* Easy for Spring Boot developers to understand
