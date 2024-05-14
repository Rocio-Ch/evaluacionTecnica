<template>
    <v-toolbar flat style="margin-top: 20px; background-color: white;">
        <v-toolbar-title style="font-weight: 500; font-size: 27px">
            Tasks List
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
            class="mb-2 mr-2"
            height="50px"
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
        ></v-text-field>
        <v-btn
            elevated
            class="newTask mb-2"
            color="#fff"
            dark
            style="background-color: #14a3c6"
            height="50px"
            @click="openCreateTaskDialog"
        >
                <!--#2196f3-->
            New Task
        </v-btn>
    </v-toolbar>
    <template class="search">
        <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
        ></v-text-field>
    </template>
    <v-data-table
      :headers="tasksHeaders"
      :items="allTasks"
      :search="search"
      :sort-by="[{ key: 'fullName', order: 'asc' }]"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="large" @click="console.log(item.id)">mdi-pencil</v-icon>
        <v-icon size="large" @click="console.log(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <CreateTaskDialog :dialog="dialogCreateTask" :close="() => (dialogCreateTask = false)" />
</template>
  
<script setup>

import { ref, onMounted } from "vue"

const search = ref("")
const dialogCreateTask = ref(false)

onMounted(() => {
    allTasks
})

const tasksHeaders = [
    { align: "start", key: "title", title: "Title" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status"},
    { key: "dateExpiration", title: "Expiration" },
    { key: "actions", title: "Actions", sortable: false },
]

const openCreateTaskDialog = () => {
    dialogCreateTask.value = true
    console.log("Open Dialog: 'New task'")
}
  

const allTasks = [
    {
        id: 1,
        title: "Supermercado",
        description: "Comprar vainillin, chocolate, leche y huevos",
        status:  "Done",
        dateExpiration: "15/05/2024",
    },
    {
        id: 2,
        title: "Panaderia",
        description: "Bizcochitos, masas finas y pan",
        status:  "Undone",
        dateExpiration: "10/05/2024",
    },
    {
        id: 3,
        title: "Limpiar la pieza",
        description: "Pasar blem al escritorio, armar la cama, barrer y encerar",
        status:  "Undone",
        dateExpiration: "10/05/2024",
    }
]

</script>
  
<style>

thead {
    background-color: #e94408;
    /*     background-color: #18a35e;
        background-color: #14a3c6; */
    color: white;
}

.newTask:hover {
    box-shadow: 1px 1px 6px 0px #272727bf;
    background: linear-gradient(to right, #14a3c6, #168ed9);
}

.v-toolbar__content > .v-btn:last-child  {
    margin-inline-end: 20px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>
  
  