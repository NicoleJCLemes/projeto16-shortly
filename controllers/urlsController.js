import database from "../database.js";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

export async function postShortUrl (req, res) {
    const { url } = req.body;
    const userId = res.locals.userId;
    const shortUrl = nanoid();

    try {

        await database.query(`INSERT INTO links (userId, url, shortUrl, visitCount, createdAt) 
        VALUES ($1, $2, $3, $4, $5)`, [userId, url, shortUrl, 0, dayjs().format('DD/MM/YYYY')]);

        res.status(201).send({
            shortUrl
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Não foi possível encurtar seu link!");
    }
}

export async function getShortUrl (req, res) {
    const { id } = req.params;

    try {
        
        const exists = await database.query(`SELECT * FROM links WHERE shortUrl = $1`, [id]);
        if (exists.rows.length === 0) {
            return res.sendStatus(404)
        }
    
        res.status(200).send({
            id: exists.rows[0].id,
            shortUrl: exists.rows[0].shortUrl,
            url: exists.rows[0].url
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).send("Não foi possível realizar essa operação!")
    }
}

export async function openShortUrl (req, res) {
    const { shortUrl } = req.params;

    try {
        
        const exists = await database.query(`SELECT * FROM links WHERE shortUrl = $1`, [shortUrl]);
        if (exists.rows.length === 0) {
            return res.sendStatus(404);
        }

        await database.query(`UPDATE links SET visitCount = visitCount + 1 WHERE shortUrl = $1`, [shortUrl]);
        res.redirect(`${exists.rows[0].url}`);

    } catch (error) {
        
        console.log(error);
        res.status(500).send("Não foi possível abrir a URL!");

    }
}

export async function deleteUrl (req, res) {
    const { id } = req.params;
    const userId = res.locals.userId

    
    try {
        
        const belongs = await database.query(`SELECT * FROM links WHERE shortUrl = $1`, [id]);
    
        if (belongs.rows.length === 0) {
            return res.status(404).send("URL não encontrada!");
        } else if (belongs.rows[0].userId !== userId) {
            return res.status(401).send("URL pertence a outro usuário!");
        } else {
            await database.query(`DELETE FROM links WHERE shortUrl = $1`, [id]);
            res.sendStatus(204);
        }

    } catch (error) {
        
        console.log(error);
        res.status(500).send("Não foi possível deletar a URL!");

    }

}