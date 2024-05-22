import { createRouter, createWebHistory } from "vue-router";
import Container from "@/components/Container.vue";
import NotFound from "@/components/NotFound.vue";

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
       },
       {
         path: '/:pathMatch(.*)',
         component: NotFound
      },
    ]
 })
 
 export default router