import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authentication(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send("Token inexistente/inválido!");
    }

    const token = authorization.replace("Bearer", "").trim();

    const secretKey = process.env.JWT_SECRET;

    try {
        
        const userId = jwt.verify(token, secretKey);
        res.locals.userId = userId;

    } catch (error) {

        console.log(error);
        res.sendStatus(401);
        
    }

    next();
}