import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () => import('../view/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: () => import('../view/Register.vue')
    },
    {
        path: '/home',
        name: '主页',
        meta: {
            title: '主页'
        },
        component: () => import('../view/Home.vue'),
        redirect: '/index',
        children: [
            {
                path: '/index',
                meta: {
                    title: '首页'
                },
                component: () => import('../view/Welcome.vue')
            },
            {
                path: '/user',
                meta: {
                    title: '用户'
                },
                component: () => import('../view/user/Index.vue'),
            },
        ],
    },
    {
        path: '/404',
        name: '404NotFound',
        component: () => import('../view/NotFound.vue')
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 挂载路由导航守卫：to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
    // 修改页面 title,如果存在页面标题，则在前面加上后台管理系统几个字
    if (to.meta.title) {
        document.title = '思凡后台管理 - ' + to.meta.title
    }
    // 放行登录页面
    if (to.path === '/login') {
        return next()
    }
    // 获取token
    // const token= sessionStorage.getItem('token')
    // if (!token) {
    //   return next('/login')
    // } else {
    //   next()
    // }
    return next()
})

// 导出路由
export default router