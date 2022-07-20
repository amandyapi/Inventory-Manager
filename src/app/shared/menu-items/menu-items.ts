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
        state: 'dashboard-main',
        short_label: 'D',
        name: 'Tableau de bord',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  },
  {
    label: 'Stocks',
    main: [
      {
        state: 'stocks',
        short_label: 'S',
        name: 'Stocks',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'product-list',
            name: 'Liste des Produits'
          },
          {
            state: 'product-add',
            name: 'Enregistrement de produit'
          },
          {
            state: 'category-list',
            name: 'Categories'
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
          },
          {
            state: 'simple-page',
            name: 'Liste des Transactions'
          }
        ]
      }
    ],
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
