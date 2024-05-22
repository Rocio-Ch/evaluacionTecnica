<template>
    <div class="not-found-container">
        <div class="not-found-container--info">
            <h1 class="not-found-title">¡Oops! Page not found</h1>
            <RouterLink to="/" class="not-found-link">Back to Home</RouterLink>
        </div>
    </div>
</template>
  
<script setup>

import { RouterLink } from 'vue-router';

</script>
  
<style >

.not-found-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    background: center / cover no-repeat url("../assets/404.png");
    background-color: #d3d3d7;
}

.not-found-container--info {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding: 0 25px 25px 0;
}

.not-found-title {
    font-size: 3rem;
    background: linear-gradient(to right, #00f7ff, #020287);
    background-size: cover;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.not-found-link {
    margin-top: 20px;
    padding: 15px 30px;
    border: none;
    background-color: #0d0c0c;
    border-radius: 24px;
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
}

.not-found-link:hover {
    box-shadow: 3px 3px 5px 0px #272727bf;
    background: linear-gradient(to right, #01a0a5, #1111d4);
}

</style>