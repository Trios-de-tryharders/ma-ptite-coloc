import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user/user.routes";
import colocationRoutes from "./routes/colocation.routes";
import errorHandler from "./middlewares/errorHandler";
import logger from "./middlewares/logger";

const app = express();

// Middlewares globaux
app.use(express.json()); // Permet de lire le body en JSON
app.use(cors());         // Active CORS pour les requêtes cross-origin
app.use(helmet());       // Sécurise les headers HTTP
app.use(logger);

// Routes
app.get("/", (req, res) => {
  throw new Error("Il n'y a rien d'implémenté dans cette route, à vous de jouer !");
});

app.use("/api/users", userRoutes); // Routes pour les utilisateurs
app.use("/api/colocations", colocationRoutes); // Routes pour les colocations

// Middleware de gestion des erreurs (à vous de le personnaliser pour qu'il soit réutilisable, pensez aux classes d'erreurs)
app.use(errorHandler);

export default app;