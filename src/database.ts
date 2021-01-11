import { Pool } from 'pg'
 
export const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: 'sa2',
    database: 'Personas',
    port: 5432    
});