<script setup>
import Navbar from "@/components/Navbar.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const user = ref(null); // Stocke les infos utilisateur
const router = useRouter();
const colocs = ref([]); // Stocke les colocations
const token = localStorage.getItem('token'); // Récupère le token au début

// Vérification si le token est présent
if (!token) {
  console.error('Token non trouvé. Veuillez vous reconnecter.');
}

console.log('Token:', token);

// Récupère les informations utilisateur au montage du composant
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    fetchColocations();
  } else {
    router.push('/login');
  }
});

// Fonction pour récupérer les colocations
const fetchColocations = async () => {
  try {
    if (!token) {
      throw new Error('Token manquant, veuillez vous reconnecter.');
    }

    const response = await fetch('http://10.111.9.70:3000/api/colocations', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    colocs.value = data;
  } catch (error) {
    console.error("Erreur lors de la récupération des colocations:", error);
  }
};

// Fonction pour supprimer une colocation
const deleteColoc = async (colocId, colocOwnerId) => {
  try {
    console.log(`ID de la colocation à supprimer: ${colocId}, ID du propriétaire: ${colocOwnerId}`);

    // Vérification si l'utilisateur est le propriétaire de la colocation
    if (user.value.id !== colocOwnerId) {
      alert('Vous ne pouvez supprimer que vos propres colocations.');
      return;
    }

    const response = await fetch(`http://10.111.9.70:3000/api/colocations/${colocId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    // Mise à jour de la liste des colocations après suppression
    colocs.value = colocs.value.filter(coloc => coloc.id !== colocId);

  } catch (error) {
    console.error("Erreur lors de la suppression de la colocation:", error);
  }
};

// Données du formulaire pour ajouter une nouvelle colocation
const colocLocation = ref("");
const colocArea = ref("");
const colocNumberOfRooms = ref(1); // Par défaut 1 chambre
const colocOwnerName = ref("");
const colocDescription = ref("");

// Fonction pour ajouter une colocation
const addColoc = async (event) => {
  event.preventDefault(); // Empêche le rechargement de la page

  try {
    // Vérifie que toutes les informations nécessaires sont présentes
    if (!colocLocation.value || !colocArea.value || !colocOwnerName.value || !colocDescription.value) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    const colocData = {
      location: colocLocation.value,
      area: parseFloat(colocArea.value),
      numberOfRooms: parseInt(colocNumberOfRooms.value),
      ownerName: colocOwnerName.value,
      description: colocDescription.value
    };

    const response = await fetch('http://10.111.9.70:3000/api/colocations/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(colocData)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    // Réinitialise le formulaire après l'ajout
    colocLocation.value = "";
    colocArea.value = "";
    colocNumberOfRooms.value = 1;
    colocOwnerName.value = "";
    colocDescription.value = "";

    // Ajoute la nouvelle colocation à la liste des colocations localement
    colocs.value.push(colocData);

  } catch (error) {
    console.error("Erreur lors de l'ajout de la colocation:", error);
  }
};

</script>


<template>
  <body>
  <header>
    <Navbar />
  </header>

  <main>
    <div class="left">
      <div class="title">
        <h1>Liste des colocations</h1>
      </div>

      <div class="list-coloc">
        <ul>
          <li v-for="coloc in colocs" :key="coloc.id">
            <div class="coloc-card">
              <div>
                <p>Owner : {{ coloc.ownerName }}</p>
                <p>Localisation: {{ coloc.location }}</p>
                <p>Area: {{ coloc.area }}</p>
              </div>
              <div>
                <p>Description :</p>
                <p>{{ coloc.description }}</p>
              </div>
              <div>
                <button @click="() => deleteColoc(coloc.id, coloc.ownerId)">Supprimer</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="right">
      <div class="title">
        <h1>Ajouter une colocation</h1>
      </div>

      <div class="form">
        <form @submit="addColoc">
          <input type="text" placeholder="Localisation" v-model="colocLocation" required />
          <input type="number" placeholder="Area (m²)" v-model="colocArea" required />
          <input type="number" placeholder="Nombre de chambres" v-model="colocNumberOfRooms" min="1" required />
          <input type="text" placeholder="Nom du propriétaire" v-model="colocOwnerName" required />
          <input type="text" placeholder="Description" v-model="colocDescription" required />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  </main>
  </body>
</template>


<style scoped>
body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  height: 10%;
  max-height: 10%;
}

main {
  display: flex;
  flex-direction: row;
  height: 90%;
  max-height: 90%;
  width: 100%;
  max-width: 100%;
}

.left {
  width: 50%;
  max-width: 50%;
}

.right {
  width: 50%;
  max-width: 50%;

  display: flex;
  flex-direction: column;
}

form{
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px;
}

form input{
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

.title{
  text-align: center;
  padding: 20px;
}

.list-coloc{
  padding: 40px;
}

.list-coloc li{
  list-style: none;
}

.coloc-card{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
}
</style>
