import { Router } from "express";
import { postShortUrlValidation } from "../middlewares/urlsValidation.js";
import { postShortUrl, getShortUrl, openShortUrl, deleteUrl } from "../controllers/urlsController.js";
import { authentication } from "../middlewares/authentication.js";

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', authentication, postShortUrlValidation, postShortUrl);
urlsRouter.get('/urls/:id', getShortUrl);
urlsRouter.get('/urls/open/:shortUrl', openShortUrl);
urlsRouter.delete('/urls/:id', authentication, deleteUrl);

export default urlsRouter;