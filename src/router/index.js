import { createRouter, createWebHistory } from 'vue-router'


//基础路由
const routes = [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: () =>
            import ('@/views/Login')
    },
    {
        path: '/404',
        component: () =>
            import ('@/components/NotFound')
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('@/views/home/Home'),
        redirect: '/index',
        children: [{
                path: '/index',
                component: () =>
                    import ('@/views/home/Index')
            },
            {
                path: '/25',
                component: () =>
                    import ('@/views/user/User'),
                meta: { dynamic: true }
            }, {
                path: '/27',
                component: () =>
                    import ('@/views/category/Category'),
                meta: { dynamic: true }
            },
            {
                path: '/28',
                component: () =>
                    import ('@/views/category/AddCategory'),
                meta: { dynamic: true }
            }, {
                path: '/30',
                component: () =>
                    import ('@/views/goods/Goods'),
                meta: { dynamic: true }
            }, {
                path: '/31',
                component: () =>
                    import ('@/views/goods/AddGoods'),
                meta: { dynamic: true }
            },
            {
                path: '/33',
                component: () =>
                    import ('@/views/commentary/Commentary'),
                meta: { dynamic: true }
            },
            {
                path: '/35',
                component: () =>
                    import ('@/views/order/Order'),
                meta: { dynamic: true }
            }, {
                path: '/37',
                component: () =>
                    import ('@/views/swipe/Swipe'),
                meta: { dynamic: true }
            }, {
                path: '/38',
                component: () =>
                    import ('@/views/swipe/AddSwipe'),
                meta: { dynamic: true }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


//路由守卫
router.beforeEach((to, from, next) => {

    const token = window.localStorage.getItem('token')
    if (!token) { //没有登录去登录
        next('/login')
    } else { //登录，判断路由权限
        if (to.meta.dynamic) {
            //获取权限菜单数据
            const list = JSON.parse(window.localStorage.getItem("menuList"));
            const mapList = [];
            list.forEach(item => {
                item.children.forEach(item => {
                    mapList.push('/' + item.id)
                })
            })

            // const mapList = ["/25", "/27", "/28", "/30"]
            //如果跳转的路径在这个路由表中，就跳转
            if (mapList.includes(to.path)) {
                next()
            } else { //没有权限
                next('/404')
            }
        } else {
            next()
        }
    }
})

export default router