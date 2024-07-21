import { sql } from "@vercel/postgres"

export const createUserTable = async () => {
    const table = await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255),
            password TEXT NOT NULL,
            phone VARCHAR(255),
            email TEXT NOT NULL UNIQUE,
            photo VARCHAR(255),
            active BOOLEAN DEFAULT TRUE
        );
    `

    return table
}