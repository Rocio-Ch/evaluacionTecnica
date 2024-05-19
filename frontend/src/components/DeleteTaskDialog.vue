<template>
    <v-dialog v-model="props.dialog" max-width="500px">
        <v-card>
        <v-card-title class="text-h5" style="padding: 20px 20px 40px;">Are you sure you want to delete this task?</v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#fff" elevated variant="text" @click="props.close" style="background-color: #424242;">Cancel</v-btn>
            <v-btn color="#fff" elevated variant="text" @click="deleteTask" style="background-color: #00897B;">OK</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

import { useTasks } from '@/composables/useTasks';

const { deleteData } = useTasks()
const props = defineProps(["dialog", "close", "id"])
const emit = defineEmits(["deleteConfirm"])


const deleteTask = async () => {
  const deleteItemConfirm = await deleteData(props.id)
  emit("deleteConfirm", deleteItemConfirm.id)
  props.close()
}

</script>