<template><!-- activator="parent" -->
    <v-dialog v-model="props.dialog"  persistent max-width="500">
        <template v-slot:default="{ isActive }">
        <v-card rounded="lg">
            <v-card-text>
            <div class="mb-2">New post</div>
            <v-col>
              <v-text-field
                    v-model="newTask.title"
                    label="Title">
              </v-text-field>
              <v-textarea
                  v-model="newTask.content"
                  :maxlength="maxChar"
                  :counter="200"
                  class="mb-2"
                  rows="5"
                  variant="outlined"
                  placeholder="¿Qué está pasando?"
                  persistent-counter
              ></v-textarea>
              <!-- SELECT STATUS -->
              <v-select
                v-model="newTask.status"
                label="Status"
                :items="['Completed', 'Pending', 'In progress']"
              ></v-select>
              <!-- DATE EXP FROM **LABS** IN VUETIFY -->
             <v-date-input 
                label="Expiration"
                v-model="newTask.expiration"
             ></v-date-input>
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
import { ref } from 'vue'

const maxChar = ref(200)
const task = ref({})
const props = defineProps(["dialog", "close"])


const newTask = ref({
    title: '',
    content: '',
    status: '',
    expiration: null,
})


const saveTask = async () => {
    task.value = newTask.value
    console.log(task.value)
    props.close()
}


</script>
  