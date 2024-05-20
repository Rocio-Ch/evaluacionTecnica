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
                    :counter="80"
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
                            v-model="newTask.status_id"
                            :rules="rules.description"
                            label="Status"
                            :items="statusNames"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="6.5" sm="6">
                        <!-- INPUT DATE FROM **LABS** in VUETIFY -->
                        <v-date-input 
                            label="Expiration"
                            v-model="newTask.expires_at"
                            :rules="rules.expires"
                            :min="minExpirationDate"
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
    <!-- ALERT  -->
    <v-snackbar 
        v-model="showSuccessAlert" 
        :timeout="1500" 
        color="success"
        elevation="24"
    >
        <p class="alertTitle">
            <v-icon icon="mdi-check-circle"></v-icon>
            Added
        </p>
      <p class="alertMsj">Task added <strong>successfully</strong>.</p>
    </v-snackbar>
</template>
  
<script setup>

import { VDateInput } from 'vuetify/labs/VDateInput'
import { ref, onMounted } from 'vue'
import { useTasks } from '@/composables/useTasks';
import { useStatus } from '@/composables/useStatus';
import { useFormatDate } from '@/composables/useFormatDate';

const maxChar = ref(80)
const showSuccessAlert = ref(false)
const minExpirationDate = new Date().toISOString().substr(0, 10)
const props = defineProps(["dialog", "close"])
const emit = defineEmits(["addNewTask"])

const { postData, task } = useTasks()
const { statusNames, getAllStatus, status } = useStatus()
const { formatDate } = useFormatDate()

onMounted(() => {
    getAllStatus()
})

const newTask = ref({
    title: '',
    description: '',
    status_id: '',
    expires_at: null,
})

const rules = {
    title: [
        (v) => !!v || "Required", 
        (v) => !!v && v.length >= 3  || "At least 3 characters",
        (v) => !!v && v.length <= 35 || "Max 35 characters",
    ],
    description: [
        (v) => !!v || "Required",
        (v) => !!v && v.length >= 3 || "At least 3 characters",
        (v) => !!v && v.length <= 80 || "Max 80 characters",
    ],
    status: [
        (v) => !!v || "Required",
    ],
    expires: [
        (v) => !!v || "Required",
    ]
}


const saveTask = async () => {
    const idStatus = status.value.find(s => s.name === newTask.value.status_id);
    formatDate(newTask.value, 'expires_at', 'yyyy-MM-dd HH:mm:ss.SSS')
    newTask.value.status_id = idStatus.id
    task.value = {...newTask.value}
    //me falta chequear la validacion y si pasa la validacion me tengo que fijar si esta creando o editando un usuario para utilizar distintos emits y funciones
    const saveNewTask = await postData()
    emit("addNewTask", saveNewTask)

    props.close()
    showSuccessAlert.value = true
    newTask.value = {}
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

.v-snackbar__wrapper {
    border: 1px solid #4caf50 !important;
    position: absolute;
    right: 0;
    bottom: 50px;
}

.v-snackbar__content {
    height: 90px !important;
    width: 330px !important;
    font-size: 18px;
    color: white;
    background-color: #4caf50;
    padding-left: 10px;
}

.alertTitle {
    font-weight: bold;
    font-size: 1.2rem;
}

.alertTitle .v-icon {
    margin-right: 10px;
}

.alertMsj {
    margin-left: 42px;
    font-size: 1rem;
}

</style>