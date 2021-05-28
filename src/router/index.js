// 官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';

//自訂的分頁元件
// import Home from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import CustomerOrder from '@/components/pages/CustomerOrders';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';

//啟用
Vue.use(VueRouter);


export default new VueRouter({
    routes:[
        {
            path: '*',
            redirect: 'login'
        },
        // {            
        //     name: '首頁', // 元件會呈現的名稱
        //     path: '/', // 虛擬的路徑
        //     component: Home, // 對應的元件
        //     meta: { requiresAuth: true }
        // },
        
        {
            name: 'Login',
            path: '/login', // 虛擬的路徑
            component: Login, // 對應的元件
        },
        {            
            name: 'Dashboard', // 元件會呈現的名稱
            path: '/admin', // 虛擬的路徑
            component: Dashboard, // 對應的元件                        
            children: [
                {
                  path: 'products',
                  name: 'Products',
                  component: Products,
                  meta: { requiresAuth: true },
                },
                {
                  path: 'coupons',
                  name: 'Coupons',
                  component: Coupons,
                  meta: { requiresAuth: true },
                },
                {
                  path: 'orders',
                  name: 'Orders',
                  component: Orders,
                  meta: { requiresAuth: true },
                },
            ],
        },
        {            
            name: 'Dashboard', // 元件會呈現的名稱
            path: '/', // 虛擬的路徑
            component: Dashboard, // 對應的元件                        
            children: [
                {
                    name: 'CustomerOrder',
                    path: 'customer_order', // 虛擬的路徑
                    component: CustomerOrder, // 對應的元件
                },
            ]
        },
        /*{
            // name: '分頁', // 元件會呈現的名稱
            path: '/page', // 虛擬的路徑
            // component: Page, // 對應的元件
            components: {       // 可以載入多個元件
                default: Page,
                menu: Menu,
            },
            children:[
                {
                    name: '卡片 1', // 元件會呈現的名稱
                    path: '', // 沒輸入表示預設
                    component: Child, // 對應的元件
                },
                {
                    name: '卡片 2', // 元件會呈現的名稱
                    path: 'Child2', // 虛擬的路徑
                    component: Child2, // 對應的元件
                },
                {
                    name: '卡片 3', // 元件會呈現的名稱
                    path: 'Child/', // 虛擬的路徑
                    component: Child3, // 對應的元件
                },
            ],
        },*/
    ]
});