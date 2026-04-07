/**
 * TypeScript Concepts Covered:
 * - Enums (UserRole, UserStatus)
 * - Interfaces (IUser, ApiResponse)
 * - Utility Types (Omit, Partial)
 * - Generics (ApiResponse<T>)
 */

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

export interface IUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}

// Utility Types: Creating new types from existing interfaces
// Omit id, created_at, and updated_at because they are auto-generated
export type CreateUserDTO = Omit<IUser, 'id' | 'created_at' | 'updated_at'>;

// Partial makes all properties optional (good for updates)
export type UpdateUserDTO = Partial<CreateUserDTO>;

// Generics Example: A generic standard API response structure
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
