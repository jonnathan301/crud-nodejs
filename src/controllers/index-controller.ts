import {Request, Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database'

export const getPersons = async (req: Request, res:Response) => {
    const response : QueryResult = await pool.query('select * from Person');    
    res.status(200).json(response.rows);
}

 