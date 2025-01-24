/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 default: "Jean"
 *               lastname:
 *                 type: string
 *                 default: "Dupont"
 *               email:
 *                 type: string
 *                 default: "jean.dupont@example.com"
 *               password:
 *                 type: string
 *                 default: "password123"
 *               age:
 *                 type: integer
 *                 minimum: 18
 *                 default: 18
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Entrée invalide
 *       409:
 *         description: Utilisateur déjà existant
 * /api/users/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: "jean.dupont@example.com"
 *               password:
 *                 type: string
 *                 default: "password123"
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 *       401:
 *         description: Email ou mot de passe invalide
 * /api/users:
 *   get:
 *     summary: Obtenir la liste des utilisateurs
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: firstname
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastname
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       400:
 *         description: Entrée invalide
 * /api/users/me:
 *   get:
 *     summary: Obtenir le profil de l'utilisateur connecté
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profil utilisateur
 *       400:
 *         description: ID utilisateur invalide
 *       404:
 *         description: Utilisateur non trouvé
 * /api/users/refresh:
 *   get:
 *     summary: Rafraîchir le token utilisateur
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Token rafraîchi avec succès
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: Vous ne pouvez pas supprimer un autre utilisateur
 *       403:
 *         description: Interdit
 *       404:
 *         description: Utilisateur non trouvé
 *   patch:
 *     summary: Mettre à jour partiellement un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 default: "Jean"
 *               lastname:
 *                 type: string
 *                 default: "Dupont"
 *               email:
 *                 type: string
 *                 default: "jean.dupont@example.com"
 *               age:
 *                 type: integer
 *                 default: 30
 *               isAdmin:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Entrée invalide
 *       403:
 *         description: Vous ne pouvez pas mettre à jour un autre utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 *   put:
 *     summary: Remplacer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 default: "Jean"
 *               lastname:
 *                 type: string
 *                 default: "Dupont"
 *               email:
 *                 type: string
 *                 default: "jean.dupont@example.com"
 *               password:
 *                 type: string
 *                 default: "password123"
 *               age:
 *                 type: integer
 *                 default: 30
 *               isAdmin:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Utilisateur remplacé avec succès
 *       400:
 *         description: Entrée invalide
 *       403:
 *         description: Vous ne pouvez pas mettre à jour un autre utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 */