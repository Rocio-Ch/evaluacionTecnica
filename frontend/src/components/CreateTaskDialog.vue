<template>
  <v-dialog v-model="props.dialog" persistent max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-form @submit.prevent="saveTask" ref="formRef">
          <v-card-text>
            <div class="formTitle mb-2">{{ formTitle }}</div>
          </v-card-text>
          <v-col>
            <v-text-field
              autofocus
              v-model="task.title"
              :rules="rules.title"
              label="Title"
            >
            </v-text-field>
            <v-textarea
              v-model="task.description"
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
                  v-model="task.status_id"
                  :rules="rules.status"
                  label="Status"
                  :items="status"
                  item-title="name"
                  item-value="id"
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="6.5" sm="6">
                <!-- INPUT DATE FROM **LABS** in VUETIFY -->
                <v-date-input
                  label="Expiration"
                  v-model="task.expires_at"
                  :rules="rules.expires"
                  :min="minExpirationDate"
                ></v-date-input>
              </v-col>
            </v-row>
            <div v-if="task.id">
              <v-text-field v-model="comment" label="Comment"> </v-text-field>
            </div>
          </v-col>
          <v-card-actions class="my-2 d-flex justify-end">
            <v-btn
              class="text-none"
              rounded="xl"
              text="Cancel"
              @click="
                () => {
                  props.close(), ((task = { ...resetTask }), (comment = ''));
                }
              "
            ></v-btn>
            <v-btn
              class="btnSubmit text-none"
              color="#0d0c0cf7"
              rounded="xl"
              text="Submit"
              variant="flat"
              type="submit"
            ></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import { ref, onMounted, watch, computed } from "vue";
import { useTasks } from "@/composables/useTasks";
import { useStatus } from "@/composables/useStatus";
import { useFormatDate } from "@/composables/useFormatDate";
import { useToast } from "vue-toastification";

const formRef = ref(null);
const maxChar = ref(80);
const minExpirationDate = new Date().toISOString().substr(0, 10);

const toast = useToast();
const props = defineProps(["dialog", "close", "id", "taskDeleted"]);
const emit = defineEmits(["addNewTask", "editTask"]);

const {
  postData,
  task,
  getTask,
  resetTask,
  updateData,
  getDeletedTask,
  updateDeletedData,
  comment,
} = useTasks();
const { getAllStatus, status } = useStatus();
const { formatDate } = useFormatDate();

onMounted(() => {
  getAllStatus();
});

watch(
  () => props.id,
  async () => {
    if (props.id) {
      await getTask(props.id);
    } else {
      task.value = resetTask;
    }
  }
);

watch(
  () => props.taskDeleted,
  async () => {
    if (!props.taskDeleted.is_active) {
      await getDeletedTask(props.taskDeleted.id);
    } else {
      task.value = resetTask;
    }
  }
);

const formTitle = computed(() => {
  return task.value.id ? props.taskDeleted ? "Restore Task" : "Edit Task" : "New Task";
});

const rules = {
  title: [
    (v) => !!v || "Required",
    (v) => (!!v && v.length >= 3) || "At least 3 characters",
    (v) => (!!v && v.length <= 35) || "Max 35 characters",
  ],
  description: [
    (v) => !!v || "Required",
    (v) => (!!v && v.length >= 3) || "At least 3 characters",
    (v) => (!!v && v.length <= 80) || "Max 80 characters",
  ],
  status: [(v) => !!v || "Required"],
  expires: [(v) => !!v || "Required"],
};

const saveTask = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    task.value = formatDate(
      task.value,
      "expires_at",
      "yyyy-MM-dd HH:mm:ss.SSS"
    );
    if (task.value.id) {
      if (props.taskDeleted) {
        const editedTask = await updateDeletedData(task.value);
        emit("editTask", editedTask);
        toast.success("Task restored successfully!");
        props.close();
        return
      }
      const editedTask = await updateData();
      emit("editTask", editedTask);
      toast.success("Edited successfully!");
    } else {
      const saveNewTask = await postData();
      emit("addNewTask", saveNewTask);
      toast.success("Added successfully!");
    }
    props.close();
  } else {
    toast.error("Fields must be valid!");
  }
  task.value = { ...resetTask };
  comment.value = "";
};
</script>

<style>
.formTitle {
  font-size: 18px;
  font-weight: 500;
}

.v-picker__actions button {
  border-radius: 24px;
}

.btnSubmit {
  color: #fff;
  width: 100px;
}

.btnSubmit:hover {
  box-shadow: 1px 1px 6px 0px #272727bf;
  background: linear-gradient(to right, #1a7780, #0a9907);
}
</style>
