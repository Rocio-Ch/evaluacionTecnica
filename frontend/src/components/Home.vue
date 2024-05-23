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
    height: 100%;
}

.container {
    height: calc(100% - 64px);
    text-align: center;
}

.title, .title2 {
    position: absolute;
    color: black;
    font-family: "Poppins", sans-serif;
}

.title {
    top: 30%;
    font-size: 2rem;
    margin-left: 50px;
}

.title2 {
    top: 45%;
    margin-left: 50px;
    font-size: 1.2rem;
    margin-top: 20px;
}


@media (min-width: 960px) {
    .title {
        margin-left: 100px;
        font-size: 3rem;
    }

    .title2 {
        top: 38%;
        margin-left: 120px;        
        font-size: 1.5rem;
    }
}

</style>