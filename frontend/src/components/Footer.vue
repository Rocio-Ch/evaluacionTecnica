<template>
    <div class="footer">
      <div class="footer-socials">
        <strong>Rocio Magali Chaparro | 2024</strong>

        <v-spacer></v-spacer>

        <a 
         href="https://github.com/Rocio-Ch"
         target="_blank"
         class="mx-4"
         size="medium"
         variant="plain"
         >
          <v-icon icon="mdi-github"></v-icon>
        </a>

        <a 
         href="https://www.linkedin.com/in/roc%C3%ADo-magal%C3%AD-chaparro-a3530a239/"
         target="_blank"
         class="mx-4"
         size="medium"
         variant="plain"
        >
          <v-icon icon="mdi-linkedin"></v-icon>
        </a>

      </div>
    </div>
  </template>

<script setup>

</script>

<style scoped>
.footer {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;
}

.footer-socials {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background-color: black;
}

strong {
    color: white;
}

a {
    text-decoration: none; 
    color: white;
}
</style>