import database from "../database.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function signUp (req, res) {
    const {name, email, password} = req.body;

    try {
        const exists = await database.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(exists.rows.length !== 0) {
            return res.status(409).send("Email existente, escolha outro ou faça login!");
        }

        await database.query(`INSERT INTO users (name, email, password, createdAt) VALUES ($1, $2, $3, $4)`, 
        [name, email, bcrypt.hashSync(password, 10), dayjs().format('DD/MM/YYYY')]);

        res.sendStatus(201);

    } catch (error) {

        console.log(error);
        res.status(500).send("Não foi possível realizar o cadastro!");

    }
}

export async function signIn (req, res) {
    const {email, password} = req.body;

    try {
        
        const exists = await database.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(exists.rows.length === 0) {
            return res.status(401).send("Email inexistente!");
        }

        if(!bcrypt.compareSync(password, exists.rows[0].password)) {
            return res.status(401).send("Senha incorreta!");
        }
        
        const userId = { userId: exists.rows[0].id };
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(userId, secretKey);

        res.status(200).send(token);

    } catch (error) {

        console.log(error);
        res.status(500).send("Não foi possível realizar o login!");

    }
}

export async function getUser (req, res) {
    
}