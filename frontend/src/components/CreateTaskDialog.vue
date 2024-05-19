<template>
    <v-dialog v-model="props.dialog"  persistent max-width="500">
        <template v-slot:default="{ isActive }">
        <v-card rounded="lg">
            <v-card-text>
            <!-- <div class="mb-2">{{ formTitle }}</div> -->
            <v-col>
                <v-text-field
                    autofocus
                    v-model="newTask.title"
                    :rules="rules.title"
                    label="Title">
                </v-text-field>
                <v-textarea
                    v-model="newTask.description"
                    :rules="rules.description"
                    :maxlength="maxChar"
                    :counter="200"
                    class="mb-2"
                    rows="5"
                    variant="outlined"
                    placeholder="Describe your task..."
                    persistent-counter
                ></v-textarea>
                <v-row>
                    <v-col cols="12" md="5.5" sm="6">
                        <!-- SELECT STATUS -->
                        <v-select
                            v-model="newTask.status_name"
                            :rules="rules.description"
                            label="Status"
                            :items="status"
                            >
                        ></v-select>
                        <!-- :items="['Completed', 'Pending', 'In progress']" -->
                    </v-col>
                    <v-col cols="12" md="6.5" sm="6">
                        <!-- INPUT DATE FROM **LABS** in VUETIFY -->
                        <v-date-input 
                            label="Expiration"
                            v-model="newTask.expires_at"
                            :rules="rules.expires"
                        ></v-date-input>
                    </v-col>
                </v-row>
            </v-col>
            </v-card-text>
            <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
                class="text-none"
                rounded="xl"
                text="Cancel"
                @click="() => props.close() "
            ></v-btn>
            <v-btn
                class="text-none"
                color="primary"
                rounded="xl"
                text="Send"
                variant="flat"
                @click="saveTask"
            ></v-btn>
            </v-card-actions>
        </v-card>
        </template>
    </v-dialog>
</template>
  
<script setup>

import { VDateInput } from 'vuetify/labs/VDateInput'
import { ref, onMounted } from 'vue'
import { useTasks } from '@/composables/useTasks';
import { useStatus } from '@/composables/useStatus';

const maxChar = ref(80)
const task = ref({})
const props = defineProps(["dialog", "close"])

const { tasks, postTask } = useTasks()
const { status, getAllStatus } = useStatus()

onMounted(() => {
    getAllStatus()
})

const newTask = ref({
    title: '',
    description: '',
    status_name: '',
    /* status_id: null, */ //hacer que al guardar la nueva tarea se guarde con el id y no con el nombre para que no haya inconvenientes con el back
    expires_at: null, //2024-05-27 00:00:00.000 formatear la hora que guarda el input date en ese formato para que no haya inconvenientes con la base de datos

    //tengo que hacer un useFormat para utilizar la misma funcion sin repetir codigo y dejar algun comentario si no lo hice de por que instale esa dependencia
})

/* const rules = {
  title: [
    (value) => !!value || "Required", 
    (value) => !!value && value.length >= 3  || "At least 3 characters",
    (value) => !!value && value.length <= 35 || "Max 35 characters",
  ],
  description: [
    (value) => !!value || "Required",
    (value) => !!value && value.length >= 3 || "At least 3 characters",
    (value) => !!value && value.length <= 80 || "Max 80 characters",
  ],
  status: [
    (value) => !!value || "Required",
  ],
  expires: [
    (value) => !!value || "Required",
  ]
} */


const saveTask = async () => {
    task.value = newTask.value
    console.log(task.value)
    props.close()
}


</script>
  

<style>

.v-picker__actions button {
    border-radius: 24px;
}

.v-picker__actions button:nth-child(2) {
    background-color: #3a8e3a;
    color: #fff;
}

</style>