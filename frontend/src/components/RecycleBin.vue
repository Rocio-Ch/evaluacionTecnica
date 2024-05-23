<template >
    <div class="recycle-container">
        <v-toolbar flat style="margin-top: 20px; background-color: white;">
            <v-toolbar-title class="recycle-title" style="font-weight: 500; font-size: 27px">
                <v-icon size="small">mdi-delete</v-icon>
                Recycle bin
            </v-toolbar-title>
        </v-toolbar>
        <v-data-table
          :headers="tasksHeaders"
          :items="deletedTasks"
          :sort-by="[{ key: 'title', order: 'asc' }]"
        >
          <template v-slot:item.actions="{ item }">
            <button class="restore" @click="openEditTaskDialog(item)"> 
                Restore
            </button>
          </template>
        </v-data-table>
        <CreateTaskDialog :dialog="dialogEditTask" :taskDeleted="task" :close="() => {task.value = null; dialogEditTask = false}" @editTask="() => {modifyDeletedTask, removeDeletedTask(task.id);
        }"  />
    </div>
</template>
  
<script setup>

import { ref, onMounted } from "vue"
import { useTasks } from "@/composables/useTasks"
import CreateTaskDialog from "./CreateTaskDialog.vue"

const dialogEditTask = ref(false)

const { task, deletedTasks, getDeletedTasks, modifyDeletedTask, removeDeletedTask } = useTasks()


onMounted(() => {
    getDeletedTasks();
})

const tasksHeaders = [
    { align: "start", key: "title", title: "Title" },
    { key: "description", title: "Description" },
    { key: "status_name", title: "Status"},
    { key: `expires_at`, title: "Expires on", sortable: false },
    { key: "actions", title: "Actions", sortable: false },
]

const openEditTaskDialog = (item) => {
    dialogEditTask.value = true
    task.value = {...item}
}

</script>
  
<style>

.recycle-container {
    height: 100%;
}

.recycle-title .v-toolbar-title__placeholder {
    display: flex;
    align-items: center;
}

.recycle-container .v-table > .v-table__wrapper > table > thead {
    background-color: #ca0606 ;
    color: #fff;
}

.v-toolbar {
    margin-top: 0px !important;
}

.v-toolbar__content > .v-btn:last-child  {
    margin-inline-end: 20px;
}

.v-input {
    margin-bottom: 0px !important;
}

.restore {
    padding: 4px 10px;
    border-radius: 24px;
    font-weight: 500;
    background-color: #0d0c0cf7;
    color: #fff;
}

.restore:hover {
    background: linear-gradient(to right, #1a7780, #0a9907);
}

</style>