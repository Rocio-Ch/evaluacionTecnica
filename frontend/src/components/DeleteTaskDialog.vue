<template>
    <v-dialog v-model="props.dialog" max-width="500px">
        <v-card>
        <v-card-title class="deleteTitle text-h5" style="padding: 20px 20px 40px;">Are you sure you want to delete this task?</v-card-title>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="btnCancel" color="#000" elevated variant="text" @click="props.close">Cancel</v-btn>
            <v-btn class="btnDelete" color="#fff" elevated variant="text" style="background-color: #0d0c0cf7;" @click="deleteTask">OK</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

import { useTasks } from '@/composables/useTasks';
import { useToast } from 'vue-toastification';

const { deleteData } = useTasks()
const toast = useToast()
const props = defineProps(["dialog", "close", "id"])
const emit = defineEmits(["deleteConfirm"])


const deleteTask = async () => {
  const deleteItemConfirm = await deleteData(props.id)
  emit("deleteConfirm", deleteItemConfirm.id)
  toast.success("¡Task deleted successfully!")
  props.close()
}

</script>

<style>

.deleteTitle {
    padding: 20px 20px 15px !important;
}

.btnDelete, .btnCancel {
    border-radius: 24px;
}

.btnDelete:hover {
    box-shadow: 1px 1px 6px 0px #272727bf;
    background: linear-gradient(to right, #9c0a0a, #dc2626);
}

</style>