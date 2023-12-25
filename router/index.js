import { createRouter, createWebHistory } from 'vue-router'
import ReportPage from '../src/views/ReportPage.vue'
import UserList from '../src/views/UserList.vue'
import TarifList from '../src/views/TarifList.vue'
import TarifPage from '../src/views/TarifPage.vue'
import UserPage from '../src/views/UserPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'userList',
            component: UserList
        },
        {
            path: '/tarif',
            name: 'tarifList',
            component: TarifList
        },
        {
            path: '/user/:id',
            name: 'user',
            component: UserPage
        },
        {
            path: '/tarif/:id',
            name: 'tarif',
            component: TarifPage
        },
        {
            path: '/report',
            name: 'report',
            component: ReportPage
        }
    ]
})

export default router