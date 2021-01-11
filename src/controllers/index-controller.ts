import {Request, Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database'

export const getPersons = async (req: Request, res:Response) => {
    try {
        const response : QueryResult = await pool.query('select * from Person ORDER BY id ASC');
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getPersonByDocumentNumber = async (req: Request, res: Response): Promise<Response> => {
    try {        
        const documentNum = req.params.documentNumber;
        const response: QueryResult = await pool.query('SELECT * FROM Person WHERE document_number = $1', [documentNum]);
        return res.json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const createPerson = async (req: Request, res: Response) => {
    try {  
        const { documentNumber, fullname, birth, documentNumberFather, documentNumberMother } = req.body;
        const response = await pool.query('INSERT INTO Person (document_number, fullname, birth, document_number_father, document_number_mother) VALUES ($1, $2, $3, $4, $5)', [documentNumber, fullname, birth, documentNumberFather, documentNumberMother]);
        res.json({
            message: 'Person Added successfully',
            body: {
                person: { documentNumber, fullname, birth, documentNumberFather, documentNumberMother }
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const updatePerson = async (req: Request, res: Response) => {
    try {
        const documentNum = req.params.documentNumber;
        const {  fullname, birth, documentNumberFather, documentNumberMother } = req.body;
        const response = await pool.query('UPDATE Person SET fullname = $1, birth = $2, document_number_father = $3, document_number_mother = $4 WHERE document_number = $5', [            
            fullname,
            birth,
            documentNumberFather,
            documentNumberMother,
            documentNum
        ]);

        res.json('Person Updated Successfully');
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const deletePerson = async (req: Request, res: Response) => {
    try {
        const documentNum = req.params.documentNumber;
        await pool.query('DELETE FROM Person where document_number = $1', [
            documentNum
        ]);
        res.json(`Person ${documentNum} deleted Successfully`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }    
};