<template>
    <v-toolbar color="#101510">
        <RouterLink to="/" class="navLink" style="display: flex; align-items: center;">
            <img class="diamond" src="../assets/diamond.svg"></img>
            <v-toolbar-title class="toolbar-title">
                Mednat
            </v-toolbar-title>
        </RouterLink>
        <v-layout 
        active
        class="overflow-visible navBar-menu"
        >

        <RouterLink to="/" class="navLink">
            <v-btn
            class="m-2"
            height="50px"
            dark
            >
                Home
            </v-btn>
        </RouterLink>
        
        <RouterLink to="/tasks" class="navLink">
            <v-btn
            class="m-2"
            height="50px"
            dark
            >
                Tasks
            </v-btn>
        </RouterLink>
        </v-layout>
    </v-toolbar>

</template>

<script setup>

import { RouterLink } from 'vue-router';

</script>

<style scoped>

.navLink{
    color: white;
    text-decoration: none;
}

.diamond {
    width: 45px;
    fill: #43d1f4;
}

.toolbar-title {
    font-weight: 500;
    font-size: 27px;
    margin-left: 5px;
}

.navBar-menu {
    justify-content: end;
    margin-right: 10px;
}

</style>