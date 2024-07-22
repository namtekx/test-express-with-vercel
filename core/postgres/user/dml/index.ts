import { pool } from "../../index";
import IUser from "../../../Interfaces/User.interface";
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (data: IUser): Promise<IUser> => {
    try {
        const query = `
            INSERT INTO users (id, name, username, password, phone, email, photo)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, email
        `
        const values = [uuidv4() ,data.name, data.username, data.password, data.phone, data.email, data.photo];

        const user = await pool.query(query, values);

        if(user.rows.length > 0) {
            return user.rows[0]
        }
        return null
    } catch (err) {
        throw err
    }
}

export const fetchUsers = async (query?: string, data: any[] = []): Promise<IUser[]> => {
    try {
        if(query && data.length > 0) {
            const user = await pool.query(query, data)
            return user.rows
        }
    
        const user = await pool.query(`SELECT * FROM users`);
        return user.rows
    } catch(err) {
        console.log(err)
        throw err
    }
}

export const updateUsers = async(data: IUser): Promise<IUser[]> => {
    const user = await pool.sql<IUser>`
    UPDATE users 
      SET name = ${data.name}, 
          username = ${data.username},
          phone = ${data.phone},
          email = ${data.email},
          photo = ${data.photo},
      WHERE id = ${data.id}`;
    return user.rows
}

export const deleteUsers = async (data: IUser): Promise<IUser[]> => {
    const user = await pool.sql<IUser>`DELETE FROM users WHERE id = ${data.id}`;
    return user.rows
}