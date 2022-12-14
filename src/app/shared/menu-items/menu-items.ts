import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Dashboard',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Tableau de bord',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  },{
    label: 'Stocks',
    main: [
      {
        state: 'basic',
        short_label: 'S',
        name: 'Stocks',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'simple-page',
            name: 'Liste des Produits'
          },
          {
            state: 'simple-page',
            name: 'Enregistrement de produit'
          },
          {
            state: 'simple-page',
            name: 'Categories'
          },
          {
            state: 'simple-page',
            name: 'Approvisionnements'
          }
        ]
      }
    ],
  },
  {
    label: 'Orders',
    main: [
      {
        state: 'basic',
        short_label: 'O',
        name: 'Commandes',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'simple-page',
            name: 'Liste des Commandes'
          },
          {
            state: 'simple-page',
            name: 'Nouvelle Commande'
          }
        ]
      }
    ],
  },{
    label: 'Payments',
    main: [
      {
        state: 'basic',
        short_label: 'P',
        name: 'Transactions',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'simple-page',
            name: 'Liste des Transactions'
          },
          {
            state: 'simple-page',
            name: 'Nouvelle Commande'
          }
        ]
      }
    ],
  },
  {
    label: 'Tables',
    main: [
      {
        state: 'bootstrap-table',
        short_label: 'B',
        name: 'Bootstrap Table',
        type: 'link',
        icon: 'ti-receipt'
      }
    ]
  },
  {
    label: 'Map And Extra Pages ',
    main: [
      {
        state: 'authentication',
        short_label: 'A',
        name: 'Authentication',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Login',
            target: true
          }, {
            state: 'registration',
            type: 'link',
            name: 'Registration',
            target: true
          }
        ]
      },
      {
        state: 'user',
        short_label: 'U',
        name: 'User Profile',
        type: 'link',
        icon: 'ti-user'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
