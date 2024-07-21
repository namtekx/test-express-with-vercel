import IUser from "~@/Interfaces/User.interface";
import { sql } from "@vercel/postgres";
export const createUser = async (data: IUser): Promise<IUser[]> => {
    const user = await sql<IUser>`SELECT * FROM users`;
    return user.rows
}

export const fetchUsers = async (query?: string): Promise<IUser[]> => {
    if(query) {
        const user = await sql<IUser>`${query}`;
        return user.rows
    }
    
    const user = await sql<IUser>`SELECT * FROM users`;
    return user.rows
}

export const updateUsers = async(): Promise<IUser[]> => {
    const user = await sql<IUser>`SELECT * FROM users`;
    return user.rows
}

export const deleteUsers = async (): Promise<IUser[]> => {
    const user = await sql<IUser>`SELECT * FROM users`;
    return user.rows
}