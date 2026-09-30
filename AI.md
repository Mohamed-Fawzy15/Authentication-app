# AI Engineering & Assistance Log (`AI.md`)

This document details how AI assistance was leveraged as a force multiplier during the implementation of this full-stack authentication task, outlining what was generated, what was reworked, and the architectural decisions made along the way.

---

## 1. AI-Assisted Components

AI was used to accelerate scaffolding, boilerplate generation, and schema validation logic:

1. **Validation Schemas & Regular Expressions**:
   - Generated the exact password validation regex meeting the requirements (minimum 8 characters, at least 1 letter, 1 number, and 1 special character):
     ```regex
     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=]).{8,}$/
     ```
   - Mirrored the validation rules between backend NestJS DTOs (`class-validator`) and frontend client forms (`zod`).
2. **Swagger / OpenAPI Integration**:
   - Scaffolding the `DocumentBuilder` setup in `main.ts` with `addBearerAuth()` for interactive protected route testing.
3. **Axios Client Interceptors**:
   - Scaffolding token attachment in the request interceptor and centralized error unwrapping in the response interceptor.
4. **Tailwind CSS UI Scaffolding**:
   - Layout structures and card styling for the Login, Register, and Protected Home pages.

---

## 2. Effective Prompts & Approaches

- **Targeted Error Resolution Prompts**:
  - Providing the exact compiler output (e.g., `MongooseError: uri must be a string`, `ReferenceError: exports is not defined in ES module scope`, `TS7031: Binding element 'children' implicitly has an 'any' type`) allowed rapid root-cause diagnosis.
- **Incremental Debugging & Verification**:
  - Verifying the backend completely via Swagger before connecting the React frontend, saving hours of full-stack debugging.

---

## 3. Issues Identified, Corrected & Reworked

AI-suggested code and initial scaffolds required critical developer judgment and rework:

### A. Redux Toolkit `createSlice` Architecture

- **Problem**: `extraReducers` was accidentally placed inside the `reducers` object map, breaking thunk handling.
- **Rework**: Restructured `AuthSlice` to place `extraReducers` as a top-level sibling of `reducers`. Added explicit `localStorage` synchronization in `loginUser.fulfilled` so `ProtectedRoutes` could persist session across refreshes.

### B. Axios TypeScript Return Mismatch

- **Problem**: Unwrapping `res.data` inside the Axios response interceptor conflicted with Axios's static TypeScript types (`AxiosResponseResult<any, T> is not assignable to type T`).
- **Rework**: Explicitly typed and cast the wrapper function with `as T` to deliver clean, unwrapped responses to the calling thunks.

### C. Frontend Dependencies & Compatibility

- **Problem**: Initially considered `flowbite-react`, but it conflicted with Tailwind CSS v4 and React 19 peer dependencies.
- **Rework**: Stripped Flowbite from `vite.config.ts` and used native Tailwind CSS utility classes and `@apply` rules, eliminating peer-dependency warnings and build latency.

---

## 4. Key Architectural Decisions

1. **Security-First Password Handling**:
   - Applied password complexity validation exclusively on **Sign Up**. For **Sign In**, only field existence (`@IsNotEmpty`) is verified to avoid leaking validation rules or prematurely rejecting valid legacy credentials.
   - Stripped the hashed password from the `GET /user/profile` response payload to prevent sensitive data leakage.
2. **Proper HTTP Status Codes**:
   - Ensured the `AuthenticationGuard` throws `UnauthorizedException` (HTTP 401) on missing or expired tokens rather than generic `BadRequestException` (HTTP 400).
3. **Pure JS `bcryptjs` over Native `bcrypt`**:
   - Chose `bcryptjs` to avoid native C++ compilation (`node-gyp`) errors across different operating systems and CI/CD environments.

---

## 5. Summary

AI served as an efficient accelerator for boilerplate and syntax, but final architectural integrity, security considerations, and build stability were actively guided, verified, and owned by human developer judgment.
