import { createClient, createPool } from "@vercel/postgres";

export const pool = createPool({
    connectionString: "postgres://default:NGhij6mVlr7Z@ep-nameless-dawn-a4rodosq-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
    ssl: {
        rejectUnauthorized: false
    }
})

// export const client = createClient({
//     connectionString: "postgres://default:NGhij6mVlr7Z@ep-nameless-dawn-a4rodosq.us-east-1.aws.neon.tech/verceldb?sslmode=require"
// })