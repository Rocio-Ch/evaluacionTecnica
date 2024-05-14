<template>
    <div class="banner-container">
        <h1 class="title">
            ¡Welcome to MEDNAT-SSR!
        </h1>
        <h2 class="title2">
            N° 1 Task Management Platform
        </h2>
    </div>
</template>


<script setup>
//
</script>

<style scoped>

.banner-container {
    position: relative;
    background-image: url("../assets/pattern-banner.jpg");
    background-size: cover;
    height: calc(100% - 114px);
}

.container {
    height: calc(100% - 64px);
    text-align: center;
}

.title {
    position: absolute;
    top: 30%;
    margin-left: 100px;
    font-family: "Poppins", sans-serif;
    font-size: 3rem;
    color: black;
}

.title2 {
    position: absolute;
    top: 38%;
    margin-left: 120px;
    margin-top: 20px;
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    color: black;
}

</style>