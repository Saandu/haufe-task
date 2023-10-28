// import axios from "axios";
import {createRouter, createWebHistory} from "vue-router";

// axios.interceptors.response.use(
//     response => response,
//     error => {
//         if (error.code === "ERR_NETWORK") {
//             router.push({path: '/404'})
//         }
//     });

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        name: "LoginPage",
        component: () => import('../views/LoginPage.vue'),
        meta: {hideForAuth: true}
    },
    {
        path: "/admin-dashboard",
        name: "AdminDashboard",
        component: () => import('../views/AdminDashboard.vue'),
        meta: {requiresAuth: true}

    },
    {
        path: "/client-dashboard",
        name: "ClientDashboard",
        component: () => import('../views/ClientDashboard.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: "/404",
        name: "ErrorPage",
        component: () => import('../views/ErrorPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//
//     console.log(from)
//
//     if (!!localStorage.getItem("user_type")) {
//         const loggedIn = localStorage.getItem("user_type");
//         if (to.matched.some(record => record.meta.requiresAuth)) {
//             if (loggedIn === "client" && to.path === "/client-dashboard") {
//                 next()
//             }
//
//             if (loggedIn === "client" && to.path === "/admin-dashboard") {
//                 next({path: "/client-dashboard"})
//             }
//
//             if (loggedIn === "admin" && to.path === "/admin-dashboard") {
//                 next({path: "/admin-dashboard"})
//             }
//
//             if (loggedIn === "admin" && to.path === "/client-dashboard") {
//                 next({path: "/admin-dashboard"})
//             }
//
//             if (loggedIn === "admin" && to.path === "/admin-dashboard") {
//                 next({path: "/admin-dashboard"})
//             }
//         }
//
//         if (to.matched.some(record => record.meta.hideForAuth)) {
//             if (loggedIn === "admin") {
//                 next({path: "/admin-dashboard"});
//             }
//              else if (loggedIn === "client") {
//                 next({path: "/client-dashboard"});
//             }
//             else {
//                 next({path: "/login"})
//             }
//         }
//     }
// });


export default router;
