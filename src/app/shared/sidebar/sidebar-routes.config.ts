import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
    {
        path: '', title: 'Stocks', icon: 'bi bi-bag-check', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/ecommerce/products-grid', title: 'Liste des produits', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ecommerce/categories', title: 'Categories', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ecommerce/add-new-product-2', title: 'Ajout de produit', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
            //{ path: '/ecommerce/products-list', title: 'Actualisation des stocks', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Commandes', icon: 'bi bi-bag-check', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/ecommerce/orders', title: 'Liste des commandes', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ecommerce/orders-details', title: 'Détail des commandes', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/ecommerce/transations', title: 'Transactions', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }
];
