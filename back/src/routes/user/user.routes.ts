import { Router } from 'express';

import * as userController from "../../controllers/user.controller";
// import { authenticate } from "../middlewares/auth.middleware";

const routes = Router();

// Route pour l'inscription d'un utilisateur
routes.post("/register", userController.registerUser);

// Route pour l'inscription d'un utilisateur
routes.post("/login", userController.checkConnection);

// Route pour obtenir la liste des utilisateurs
routes.get("/", userController.getAllUsers);

// Route pour obtenir un utilisateur par son ID
routes.get("/:id", userController.getUserById);

// Route pour récupérer le profil de l'utilisateur connecté
routes.get("/me", /* authenticate, userController.getUserProfile */);

// Route pour supprimer le profil d'un utilisateur
routes.delete("/:id", userController.deleteUser)

export default routes;