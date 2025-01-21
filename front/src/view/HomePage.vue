<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from "@/components/Navbar.vue";

const user = ref(null);
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
      router.push('/Login'); // Redirige si l'utilisateur ne peut pas être récupéré
    }
  }
});
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
