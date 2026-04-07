# TypeScript Concepts in User Management System Practical

This document breaks down the specific TypeScript features and concepts utilized in this practical project. TypeScript adds static typing to JavaScript, helping to catch errors early, improving code readability, and enhancing the development experience with better tooling (like autocomplete in VS Code).

## 1. Interfaces
Interfaces are used to define the shape or structure of an object. In `src/models/user.model.ts`, we define exactly what a `User` in our system looks like.

```typescript
export interface IUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}
```
* **Why we use it:** Whenever we fetch a user from the database or pass a user object around in our code, TypeScript will ensure it has exactly these properties (and nothing extra or missing).

## 2. Enums (Enumerations)
Enums allow you to define a set of named constraints or constants. We use them for fields that have a specific, finite set of permitted values.

```typescript
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED'
}
```
* **Why we use it:** Instead of just using a basic string like `'ADMIN'` (which could easily be misspelled as `'admin'` or `'ADMN'`), using `UserRole.ADMIN` ensures consistency. If you type it wrong, TypeScript will throw a compile-time error.

## 3. Utility Types (`Omit` and `Partial`)
TypeScript comes with several built-in "Utility Types" that allow you to construct new types based on existing ones. This keeps our code DRY (Don't Repeat Yourself).

### `Omit`
```typescript
export type CreateUserDTO = Omit<IUser, 'id' | 'created_at' | 'updated_at'>;
```
* **Why we use it:** When a user sends a request to create a new user, they shouldn't be sending the `id`, `created_at`, or `updated_at` properties because the database handles those automatically. `Omit` takes the entire `IUser` interface and removes only the specified fields to create a Data Transfer Object (DTO) specifically for our `POST` logic. 

### `Partial`
```typescript
export type UpdateUserDTO = Partial<CreateUserDTO>;
```
* **Why we use it:** When updating a user, the client might only want to change the `status` or the `email`. They don't need to send the entire object. `Partial` makes *every* property in the provided type completely optional.

## 4. Generics (`<T>`)
Generics allow you to create reusable components or types that can work with a variety of data types rather than a single one. Think of it as a variable for types.

```typescript
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
```
* **Why we use it:** Sometimes an API returns an array of users (`IUser[]`), sometimes a single user (`IUser`), and sometimes no data (`null`). Instead of creating three different interfaces, we use a Generic `<T>`. When we use the type, we tell it what `T` should be (e.g., `ApiResponse<IUser>`).

## 5. Express Types (`Request` and `Response`)
In a standard JavaScript Express app, handling request bodies and parameters natively provides no autocomplete. TypeScript helps strongly type Express controllers.

Take a look at how we typed our `updateUser` controller in `src/controllers/user.controller.ts`:

```typescript
import { Request, Response } from 'express';

export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserDTO>, 
  res: Response<ApiResponse<IUser>>
) => { ... }
```

Let's break down what `Request<{ id: string }, {}, UpdateUserDTO>` means. The Express `Request` type accepts 4 Generic parameters:
1. **ParamsDictionary:** Defines the `req.params` (URL parameters). Here, we expect an `id` that is a string (`{ id: string }`).
2. **ResBody:** The shape of the response body. Usually handled in `Response`, so we leave it empty `{}`.
3. **ReqBody:** The shape of the `req.body`. We pass `UpdateUserDTO` to ensure the incoming payload matches our update rules.
4. **ReqQuery:** Defines query parameters like `?search=term`. Not used here.

For the `Response<ApiResponse<IUser>>` type, it enforces that `res.json()` *must* return an object matching the generic `ApiResponse` format, and the `data` field specifically must be an `IUser`.

---
*By utilizing these deeply integrated TypeScript concepts, we build a highly predictable, maintainable, and robust backend ecosystem.*
