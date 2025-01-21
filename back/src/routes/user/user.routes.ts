import { Router } from 'express';
import { checkJWT, checkJWTSecret } from '../../middlewares/security';

import * as userController from "../../controllers/user.controller";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Route pour l'inscription d'un utilisateur
routes.post("/login", userController.checkConnection);

// Route pour obtenir la liste des utilisateurs
routes.get("/", checkJWT, userController.getUser);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", checkJWT, userController.getUserProfile);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/refresh", checkJWTSecret, userController.refreshToken);

// Route pour supprimer le profil d'un utilisateur
routes.delete("/:id", checkJWT, userController.deleteUser)

// Route pour mettre à jour partiellement un utilisateur
routes.patch("/:id", checkJWT, userController.updateUser);

// Route pour remplacer complètement un utilisateur
routes.put("/:id", checkJWT, userController.replaceUser);

export default routes;