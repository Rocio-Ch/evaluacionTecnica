<template>
    <v-container>
        <v-dialog v-model="props.dialog" persistent max-width="500">
            <template v-slot:default="{ isActive }">
                <div class="histoy-box">
                    <h3>
                        History
                    </h3>
                    <v-btn
                        class="btn-close"
                        size="20px"
                        text="X"
                        @click="() => props.close() "
                    ></v-btn>
                </div>
                <v-data-table
                :items="props.history"
                :headers="historyHeaders"
                :sort-by="[{ key: 'status', order: 'asc' }]"
                >
                </v-data-table>
            </template>
        </v-dialog>
    </v-container>
</template>
  
<script setup>

const props = defineProps(["dialog", "close", "history"])

const historyHeaders = [
    { align: "start", key: "status_name", title: "Status" },
    { key: "comment", title: "Comments" },
    { key: "update_status_at", title: "Updated status", sortable: false},
]

</script>
  

<style>

.histoy-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0a6b83ef;
    background-color: #000;
    padding: 15px 15px 20px 15px;
}

h3 {
    color: #fff;
}

.btn-close {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
