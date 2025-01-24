/**
 * @swagger
 * /api/distributions:
 *   post:
 *     summary: Créer une nouvelle distribution
 *     tags: [Distributions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               charge:
 *                 type: integer
 *                 default: 1
 *               user:
 *                 type: integer
 *                 default: 1
 *               amount:
 *                 type: number
 *                 default: 50.0
 *     responses:
 *       201:
 *         description: Distribution créée avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Charge ou utilisateur non trouvé
 *       403:
 *         description: Interdit
 *   get:
 *     summary: Obtenir la liste des distributions
 *     tags: [Distributions]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: charge
 *         schema:
 *           type: integer
 *       - in: query
 *         name: user
 *         schema:
 *           type: integer
 *       - in: query
 *         name: amount
 *         schema:
 *           type: number
 *       - in: query
 *         name: payed
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Liste des distributions
 *       400:
 *         description: Entrée invalide
 * /api/distributions/{id}:
 *   get:
 *     summary: Obtenir une distribution par ID
 *     tags: [Distributions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la distribution
 *       404:
 *         description: Distribution non trouvée
 *   delete:
 *     summary: Supprimer une distribution
 *     tags: [Distributions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Distribution supprimée avec succès
 *       403:
 *         description: Interdit
 *       404:
 *         description: Distribution non trouvée
 *   patch:
 *     summary: Mettre à jour partiellement une distribution
 *     tags: [Distributions]
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
 *               amount:
 *                 type: number
 *                 default: 50.0
 *               payed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Distribution mise à jour avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Distribution non trouvée
 *   put:
 *     summary: Remplacer une distribution
 *     tags: [Distributions]
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
 *               charge:
 *                 type: integer
 *                 default: 1
 *               user:
 *                 type: integer
 *                 default: 1
 *               amount:
 *                 type: number
 *                 default: 50.0
 *               payed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Distribution remplacée avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Distribution non trouvée
 */
