import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/view/HomePage.vue";
import LoginPage from "@/view/LoginPage.vue";
import ListColocPage from "@/view/ListColocPage.vue";
import BudgetPage from "@/view/BudgetPage.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage},
    { path: '/Login', name: 'Login', component: LoginPage },
    { path: '/ListColoc', name: 'ListColoc', component: ListColocPage},
    { path: '/Budget', name: 'Budget', component: BudgetPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
