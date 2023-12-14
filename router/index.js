import { createRouter, createWebHistory } from 'vue-router'
import Home from '../src/views/Home.vue'
import About from '../src/views/About.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        }
    ]
})

export default router