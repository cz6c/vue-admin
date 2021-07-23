import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/login',
    component: () =>
        import ('@/views/Login')
}, {
    path: '/home',
    component: () =>
        import ('@/views/home/Home'),
    children: [{
        path: '/25',
        component: () =>
            import ('@/views/user/User')
    }]
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router