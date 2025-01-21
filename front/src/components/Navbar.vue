<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null); // Stockera les infos utilisateur
const router = useRouter();

// Récupère les informations utilisateur au montage du composant
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/Login');
  } else {
    try {
      const response = await fetch('http://10.111.9.70:3000/api/users/me', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      user.value = userData;

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
});
  // Fonction de déconnexion
  const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  user.value = null;
  router.push('/login');
};

  const refresh = async () => {
    const response = await fetch('http://10.111.9.70:3000/api/users/refresh', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('secret')}`
      }
    });

    const token = await response.json();
    console.log(token);
    localStorage.setItem('token', token.token);
  }

</script>

<template>
  <div class="navbar">

    <div class="navbar-brand">
        MA PTITE COLOC
    </div>

    <div class="navbar-links">
      <div class="navbar-item">
        <RouterLink to="/">Accueil</RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink to="/ListColoc">List-Coloc</RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink to="/Budget">Budget</RouterLink>
      </div>
    </div>

    <div class="navbar-user">
      <div v-if="user" class="navbar-user-div">
        <div>
          {{user.firstname}}
        </div>
        <div>
          <button @click="logout">Déconnexion</button>
        </div>
      </div>
      <div v-else>
        <router-link to="/login">Connexion</router-link>
        <div>
          <button @click="refresh">refresh</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

.navbar{
  display: flex;
  background-color: #414141;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  font-size: 20px;
  color: white;
}

.navbar-links{
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.navbar-links a{
  color: white;
  text-decoration: none;
}

.navbar-links a.router-link-exact-active{
  text-decoration: underline;
}

.navbar-user{
  text-decoration: none;
}

.navbar-user-div{
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}

.navbar-user-div button{
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
}

</style>