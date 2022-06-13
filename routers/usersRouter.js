import { Router } from "express";
import { signUpValidation, signInValidation } from "../middlewares/usersValidation.js";
import { authentication } from "../middlewares/authentication.js";
import { signUp, signIn, getUser } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post('/signup', signUpValidation, signUp);
usersRouter.post('/signin', signInValidation, signIn);
usersRouter.get('/users/:id', authentication, getUser);

export default usersRouter;