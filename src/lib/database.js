import { Pool } from 'pg'

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: 'postgres',
    database: process.env.POSTGRES_DB,
    port: 5432,
  })
   
console.log(await pool.query('SELECT NOW()'))
