<script>

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
        {user.name}
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