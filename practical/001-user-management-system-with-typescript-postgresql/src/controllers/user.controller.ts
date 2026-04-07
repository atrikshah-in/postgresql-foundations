import { Request, Response } from 'express';
import pool from '../config/db';
import { IUser, CreateUserDTO, UpdateUserDTO, ApiResponse } from '../models/user.model';

// Create a new User
// Specifying Request types: Params, ResBody, ReqBody, ReqQuery
export const createUser = async (req: Request<{}, {}, CreateUserDTO>, res: Response<ApiResponse<IUser>>) => {
    const { username, email, role, status } = req.body;
    
    try {
        const result = await pool.query(
            `INSERT INTO users (username, email, role, status)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [username, email, role || 'USER', status || 'ACTIVE']
        );
        res.status(201).json({ success: true, message: 'User created successfully', data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
};

// Retrieve all users
export const getUsers = async (req: Request, res: Response<ApiResponse<IUser[]>>) => {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        res.status(200).json({ success: true, message: 'Users retrieved', data: result.rows });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
    }
};

// Retrieve a user by ID
export const getUserById = async (req: Request<{ id: string }>, res: Response<ApiResponse<IUser>>) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User retrieved', data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
    }
};

// Update a user
export const updateUser = async (req: Request<{ id: string }, {}, UpdateUserDTO>, res: Response<ApiResponse<IUser>>) => {
    const { id } = req.params;
    const { username, email, role, status } = req.body;

    try {
        const result = await pool.query(
            `UPDATE users 
             SET username = COALESCE($1, username), 
                 email = COALESCE($2, email), 
                 role = COALESCE($3, role), 
                 status = COALESCE($4, status),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $5 RETURNING *`,
            [username, email, role, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User updated', data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
    }
};

// Delete a user
export const deleteUser = async (req: Request<{ id: string }>, res: Response<ApiResponse<null>>) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
    }
};
