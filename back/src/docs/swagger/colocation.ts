/**
 * @swagger
 * /api/colocations/register:
 *   post:
 *     summary: Enregistrer une nouvelle colocation
 *     tags: [Colocations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 default: "Paris"
 *               area:
 *                 type: number
 *                 default: 50.0
 *               numberOfRooms:
 *                 type: integer
 *                 default: 3
 *               name:
 *                 type: string
 *                 default: "Appartement avec vue sur la Tour Eiffel"
 *               description:
 *                 type: string
 *                 default: "Un bel appartement"
 *     responses:
 *       201:
 *         description: Colocation créée avec succès
 *       400:
 *         description: Entrée invalide
 * /api/colocations:
 *   get:
 *     summary: Obtenir la liste des colocations
 *     tags: [Colocations]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: area
 *         schema:
 *           type: number
 *       - in: query
 *         name: numberOfRooms
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Liste des colocations
 *       400:
 *         description: Entrée invalide
 * /api/colocations/{id}:
 *   get:
 *     summary: Obtenir une colocation par ID
 *     tags: [Colocations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de la colocation
 *       404:
 *         description: Colocation non trouvée
 *   delete:
 *     summary: Supprimer une colocation
 *     tags: [Colocations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Colocation supprimée avec succès
 *       403:
 *         description: Interdit
 *   patch:
 *     summary: Mettre à jour partiellement une colocation
 *     tags: [Colocations]
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
 *               location:
 *                 type: string
 *                 default: "Paris"
 *               area:
 *                 type: number
 *                 default: 50.0
 *               numberOfRooms:
 *                 type: integer
 *                 default: 3
 *               name:
 *                 type: string
 *                 default: "Ma Colocation"
 *               description:
 *                 type: string
 *                 default: "Un bel endroit pour vivre"
 *     responses:
 *       200:
 *         description: Colocation mise à jour avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Colocation non trouvée
 *   put:
 *     summary: Remplacer une colocation
 *     tags: [Colocations]
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
 *               location:
 *                 type: string
 *                 default: "Paris"
 *               area:
 *                 type: number
 *                 default: 50.0
 *               numberOfRooms:
 *                 type: integer
 *                 default: 3
 *               name:
 *                 type: string
 *                 default: "Ma Colocation"
 *               description:
 *                 type: string
 *                 default: "Un bel endroit pour vivre"
 *     responses:
 *       200:
 *         description: Colocation remplacée avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Colocation non trouvée
 * /api/colocations/{id}/addRoommate/{roommateId}:
 *   post:
 *     summary: Ajouter un colocataire à une colocation
 *     tags: [Colocations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: roommateId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Colocataire ajouté avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Colocation ou colocataire non trouvé
 * /api/colocations/{id}/removeRoommate/{roommateId}:
 *   delete:
 *     summary: Supprimer un colocataire d'une colocation
 *     tags: [Colocations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: roommateId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Colocataire supprimé avec succès
 *       400:
 *         description: Entrée invalide
 *       404:
 *         description: Colocation ou colocataire non trouvé
 */
