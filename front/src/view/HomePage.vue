<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from "@/components/Navbar.vue";

const user = ref(null); // Stockera les infos utilisateur
const router = useRouter();

// Récupère les informations utilisateur au montage du composant
onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  } else {
    router.push('/login');
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

  <body>

    <header>
      <Navbar />
    </header>
    <main v-if="user">
      Bienvenue sur la page d'accueil de Ma P'tite Coloc !

      Pseudo : {{ user.firstname }}
    </main>

  </body>

</template>

<style scoped>

body{
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header{
  height: 10%;
  max-height: 10%;
}

main{
  height: 90%;
  max-height: 90%;
}

</style>
