<script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const user = ref(null); // Stockera les infos utilisateur
  const router = useRouter();

  // Récupère les informations utilisateur au montage du composant
  onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
  user.value = JSON.parse(storedUser);
}
});

  // Fonction de déconnexion
  const logout = () => {
  localStorage.removeItem('user');
  user.value = null;
  router.push('/login');
};
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
        <RouterLink to="/coloc">Coloc</RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink to="/budget">Budget</RouterLink>
      </div>
    </div>

    <div class="navbar-user">
      <div v-if="user">
        <div>
          {{user.firstname}}
        </div>
        <div>
          <button @click="logout">Déconnexion</button>
        </div>
      </div>
      <div v-else>
        <router-link to="/login">Connexion</router-link>
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

</style>