import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import colocationRoutes from "./routes/colocation.routes";
import errorHandler from "./middlewares/errorHandler";
import logger from "./middlewares/logger";
import chargeRoute from "./routes/charge.routes"
import distributionRoutes from "./routes/distribution.routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation de votre API Express',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Remplace par l'URL de ton API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['**/*.ts'], // Indique où Swagger doit chercher les commentaires (adapte le chemin selon ton projet)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares globaux
app.use(express.json()); // Permet de lire le body en JSON
app.use(cors());         // Active CORS pour les requêtes cross-origin
app.use(helmet());       // Sécurise les headers HTTP
app.use(logger);

// Routes
app.get("/", (req, res) => {
  throw new Error("Il n'y a rien d'implémenté dans cette route, à vous de jouer !");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRoutes); // Routes pour les utilisateurs
app.use("/api/colocations", colocationRoutes); // Routes pour les colocations
app.use("/api/charges", chargeRoute); // Routes pour les colocations
app.use("/api/distributions", distributionRoutes); // Routes for distributions

// Middleware de gestion des erreurs (à vous de le personnaliser pour qu'il soit réutilisable, pensez aux classes d'erreurs)
app.use(errorHandler);

export default app;