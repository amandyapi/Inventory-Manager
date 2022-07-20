import { CategoryInfoComponent } from './category-info/category-info.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'category-add',
        component: CategoryAddComponent
      },
      {
        path: 'category-list',
        component: CategoryListComponent
      },
      {
        path: 'category-info',
        component: CategoryInfoComponent
      },
      {
        path: 'product-list',
        component: ProductListComponent
      },
      {
        path: 'product-add',
        component: ProductAddComponent
      },
      {
        path: 'product-info',
        component: ProductInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
