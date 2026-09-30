# Full-Stack Authentication Application

A production-ready full-stack authentication system built with **NestJS**, **MongoDB**, **React 19**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.

---

## 🚀 Features

- **Sign Up**:
  - Valid email format validation.
  - Name minimum length validation (≥ 3 characters).
  - Strong password requirements (≥ 8 characters, at least 1 letter, 1 number, and 1 special character).
  - Real-time client-side validation using **Zod** + **React Hook Form**.
  - Secure server-side validation using NestJS **class-validator** DTOs.
  - Password hashing with **bcryptjs** (salt rounds = 10).
- **Sign In**:
  - Email and password verification against hashed credentials.
  - Issues signed JWT token for session authentication.
- **Protected Application Page**:
  - Protected by NestJS `AuthenticationGuard` verifying Bearer tokens.
  - Protected frontend route (`ProtectedRoutes`) redirecting unauthenticated users to `/login`.
  - Welcome banner: `"Welcome to the application."` displaying authenticated user profile details.
  - One-click **Logout** ending the session and clearing state.
- **Interactive API Documentation**:
  - Built-in **Swagger / OpenAPI** documentation with interactive Bearer token testing at `/api/docs`.

---

## 🛠 Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/) (CommonJS, Node.js)
- **Database**: [MongoDB](https://www.mongodb.com/) via `@nestjs/mongoose` / [Mongoose](https://mongoosejs.com/)
- **Authentication**: `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcryptjs`
- **Validation**: `class-validator`, `class-transformer`
- **Documentation**: `@nestjs/swagger`, `swagger-ui-express`

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (`useAuth` hook)
- **Routing**: `react-router-dom` v7
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Forms & Validation**: `react-hook-form` + `zod` + `@hookform/resolvers`
- **HTTP Client**: `axios` with global request/response interceptors

---

## 📂 Project Structure

```text
Easygenerator-task/
├── backend/
│   ├── src/
│   │   ├── common/             # Global guards, hashing, token service
│   │   ├── DB/                 # Mongoose User model & database repositories
│   │   ├── user/               # User controller, service, DTOs
│   │   ├── app.module.ts
│   │   └── main.ts             # Validation pipes, CORS, Swagger setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Client/             # Axios instance & token interceptors
│   │   ├── Components/         # Navbar, Footer, ProtectedRoutes
│   │   ├── Hooks/              # useAuth custom hook
│   │   ├── Pages/              # Login, Register, Home (Application page)
│   │   ├── Redux/              # Store & AuthSlice
│   │   ├── Types/              # TypeScript interfaces
│   │   └── App.tsx             # Router setup
│   └── package.json
├── README.md
└── AI.md                       # AI usage & engineering reflections
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Node.js**: v18+ or v20+ recommended
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or Docker:
  ```bash
  docker run -d -p 27017:27017 --name mongodb mongo:latest
  ```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure `.env` (optional, defaults provided):
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/authentication
JWT_SECRET=easygenerator-secret-key-12345
```

Start the development server:
```bash
npm run start:dev
```
- Server running at: `http://localhost:3000`
- Swagger API Docs at: `http://localhost:3000/api/docs`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```
- Frontend application running at: `http://localhost:5173`

---

## 🧪 Testing the Application Flow

1. Open `http://localhost:5173/register`
   - Enter Name (e.g. `John Doe`), Email (`john@example.com`), and Password matching rules (e.g. `Secret@123`).
   - Observe live Zod validation feedback.
2. Sign In at `http://localhost:5173/login`:
   - Enter credentials.
   - On success, token is persisted and user is redirected to the home application page.
3. Protected Home Page (`http://localhost:5173/`):
   - Displays `"Welcome to the application."` along with the user's name and email fetched from `GET /user/profile`.
   - Direct access without token redirects back to `/login`.
4. Click **Logout**:
   - Clears token and session state, redirecting to `/login`.

---

## 📖 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/user/signup` | Register new user with validated fields | No |
| `POST` | `/user/login` | Authenticate user & receive access token | No |
| `GET` | `/user/profile` | Retrieve welcome message & user profile | **Yes (Bearer JWT)** |
