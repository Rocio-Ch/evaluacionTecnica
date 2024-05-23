import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import NotFound from "@/components/NotFound.vue";
import RecycleBin from "@/components/RecycleBin.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
       {
          path: '/',
          name: "Home",
          component: Home
       },
       {
          path: '/tasks',
          name: 'Tasks',
          component: () => import('../components/TasksTable.vue')
       },
       {
         path: '/recycle-bin',
         name: 'Reicle Bin',
         component: RecycleBin,
       },
       {
         path: '/:pathMatch(.*)',
         component: NotFound
      },
    ]
 })
 
 export default router