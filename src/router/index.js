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
            path: '/home',
            redirect: '/index'
        }, {
            path: '/index',
            component: () =>
                import ('@/views/home/Index')
        }, {
            path: '/25',
            component: () =>
                import ('@/views/user/User')
        }, {
            path: '/27',
            component: () =>
                import ('@/views/category/Category')
        },
        {
            path: '/28',
            component: () =>
                import ('@/views/category/AddCategory')
        }, {
            path: '/30',
            component: () =>
                import ('@/views/goods/Goods')
        }, {
            path: '/31',
            component: () =>
                import ('@/views/goods/AddGoods')
        },
        {
            path: '/33',
            component: () =>
                import ('@/views/commentary/Commentary')
        },
        {
            path: '/35',
            component: () =>
                import ('@/views/order/Order')
        }, {
            path: '/37',
            component: () =>
                import ('@/views/swipe/Swipe')
        }, {
            path: '/38',
            component: () =>
                import ('@/views/swipe/AddSwipe')
        }
    ]
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router