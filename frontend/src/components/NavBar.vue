<template>
    <v-toolbar color="#101510">
      <RouterLink to="/" class="navLink" style="display: flex; align-items: center;">
        <img class="diamond" src="../assets/diamond.svg"></img>
        <v-toolbar-title class="toolbar-title-nav">
          Mednat
        </v-toolbar-title>
      </RouterLink>
      <v-layout class="overflow-visible navBar-menu">
        <v-tabs v-model="tab" color="#43d1f4" centered>
          <v-tab
            v-for="(item, index) in tabs"
            :key="index"
            :to="item.route"
          >
            {{ item.label }}
          </v-tab>
        </v-tabs>
      </v-layout>
    </v-toolbar>
</template>
  
<script setup>

  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const tabs = [
    { label: 'Home', route: '/' },
    { label: 'Tasks', route: '/tasks' },
    { label: 'Bin', route: '/recycle-bin' },
  ]
  
  const route = useRoute();
  const tab = ref(route.path)
  
  watch(route, (newRoute) => {
    tab.value = newRoute.path
  })

</script>
  
<style>

.navLink {
   color: white;
    text-decoration: none;
}
  
.diamond {
    width: 45px;
    fill: #43d1f4;
}
  
.toolbar-title-nav {
    display: none;
    font-weight: 500;
    font-size: 27px;
    margin-left: 5px;
}
  
.navBar-menu {
    justify-content: end;
    margin-right: 10px;
}

@media (min-width: 450px) {
    .toolbar-title-nav {
      display: block;
    }
}

</style>