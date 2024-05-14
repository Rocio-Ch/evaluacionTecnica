import { createRouter, createWebHistory } from "vue-router";
import Container from "@/components/Container.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
       {
          path: '/',
          name: "Home",
          component: Container
       },
       {
          path: '/tasks',
          name: 'Tasks',
          component: () => import('../components/TasksTable.vue')
       }
    ]
 })
 
 export default router