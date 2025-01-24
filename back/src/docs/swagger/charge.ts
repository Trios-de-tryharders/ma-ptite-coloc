/**
 * @swagger
 * /api/charges:
 *   post:
 *     summary: Créer une nouvelle charge
 *     tags: [Charges]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 default: "Électricité"
 *               amount:
 *                 type: number
 *                 default: 100.0
 *               payer:
 *                 type: integer
 *                 default: 1
 *               colocation:
 *                 type: integer
 *                 default: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 default: "2023-01-01"
 *               payed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Charge créée avec succès
 *       400:
 *         description: Entrée invalide
 *   get:
 *     summary: Obtenir la liste des charges
 *     tags: [Charges]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *       - in: query
 *         name: payer
 *         schema:
 *           type: integer
 *       - in: query
 *         name: colocation
 *         schema:
 *           type: integer
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: payed
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Liste des charges
 *       400:
 *         description: Entrée invalide
 * /api/charges/{id}:
 *   get:
 *     summary: Obtenir une charge par ID
 *     tags: [Charges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la charge
 *       404:
 *         description: Charge non trouvée
 *   delete:
 *     summary: Supprimer une charge
 *     tags: [Charges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Charge supprimée avec succès
 *       403:
 *         description: Interdit
 *   patch:
 *     summary: Mettre à jour partiellement une charge
 *     tags: [Charges]
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
 *               type:
 *                 type: string
 *                 default: "Électricité"
 *               amount:
 *                 type: number
 *                 default: 100.0
 *               payer:
 *                 type: integer
 *                 default: 1
 *               colocation:
 *                 type: integer
 *                 default: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 default: "2023-01-01"
 *               payed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Charge mise à jour avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Charge non trouvée
 *   put:
 *     summary: Remplacer une charge
 *     tags: [Charges]
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
 *               type:
 *                 type: string
 *                 default: "Électricité"
 *               amount:
 *                 type: number
 *                 default: 100.0
 *               payer:
 *                 type: integer
 *                 default: 1
 *               colocation:
 *                 type: integer
 *                 default: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 default: "2023-01-01"
 *               payed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Charge remplacée avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Charge non trouvée
 */
