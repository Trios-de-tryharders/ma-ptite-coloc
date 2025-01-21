import dotenv from "dotenv";
import { connectMongooseDB } from "./configs/databases/mongoose.config";
import { connectMySQLDB } from "./configs/databases/mysql.config";
import app from "./app";

dotenv.config();

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

Promise.all([
  connectMySQLDB.initialize(), // Connexion à MySQL
  // connectMongooseDB(),        // Connexion à MongoDB
]).then(() => {
  console.log("Connected to MongoDB!");

  // Lancer le serveur
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("Failed to initialize databases:", error);
  process.exit(1); // Arrêter le processus si une connexion échoue
});