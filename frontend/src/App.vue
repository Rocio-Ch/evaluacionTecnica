<template>
    <NavBar />
    <RouterView />
    <Footer />
</template>

<script setup>
  
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar'
  import Footer from './components/Footer'

</script>