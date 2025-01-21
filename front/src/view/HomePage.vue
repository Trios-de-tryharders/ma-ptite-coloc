<script setup>
import Navbar from  "@/components/Navbar.vue";
</script>

<template>

  <body>

    <header>
      <Navbar />
    </header>
    <main>
      coucou
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
