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
      :items="tasks"
      :search="search"
      :sort-by="[{ key: 'fullName', order: 'asc' }]"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="large" @click="console.log(item.id)">mdi-pencil</v-icon>
        <v-icon class="me-2" size="large" @click="openDeleteTaskDialog(item.id)">mdi-delete</v-icon>
        <v-icon size="large" @click="openHistoryDialog(item.id)">mdi-history</v-icon>
      </template>
    </v-data-table>
    <CreateTaskDialog :dialog="dialogCreateTask" :close="() => (dialogCreateTask = false)" />
    <HistoryTaskDialog :dialog="dialogHistory" :id="idTask" :close="() => (dialogHistory = false)" />
    <DeleteTaskDialog :dialog="dialogDeleteTask" :id="idTask" :close="() => (dialogDeleteTask = false)" @deleteConfirm="removeTask(idTask)" />
    
</template>
  
<script setup>

import { ref, onMounted } from "vue"
import { useTasks } from "@/composables/useTasks"
import { useHistory } from "@/composables/useHistory"
import CreateTaskDialog from "./CreateTaskDialog.vue"
import HistoryTaskDialog from "./HistoryTaskDialog.vue"
import DeleteTaskDialog from "./DeleteTaskDialog.vue"

const search = ref("")
const dialogCreateTask = ref(false)
const dialogHistory = ref(false)
const dialogDeleteTask = ref(false)

const { tasks, getTasks, removeTask } = useTasks()
const { idTask } = useHistory()


onMounted(() => {
    getTasks();
})

const tasksHeaders = [
    { align: "start", key: "title", title: "Title" },
    { key: "description", title: "Description" },
    { key: "status_name", title: "Status"},
    { key: `expires_at`, title: "Expires on", sortable: false },
    { key: "actions", title: "Actions", sortable: false },
]

const openCreateTaskDialog = () => {
    dialogCreateTask.value = true
}

const openHistoryDialog = (id) => {
    dialogHistory.value = true
    idTask.value = id
}

const openDeleteTaskDialog = (id) => {
    dialogDeleteTask.value = true
    idTask.value = id
}



</script>
  
<style>

.v-toolbar {
    margin-top: 0px !important;
}

thead {
    background-color: #e94408;
    /*     background-color: #18a35e;
        background-color: #14a3c6; */
    color: #fff;
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

.v-input {
    margin-bottom: 0px !important;
}

</style>
  
  