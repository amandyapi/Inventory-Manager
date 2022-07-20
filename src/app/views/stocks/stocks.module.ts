import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryInfoComponent } from './category-info/category-info.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [CategoryAddComponent, CategoryListComponent, CategoryInfoComponent, ProductInfoComponent, ProductListComponent, ProductAddComponent],
  imports: [
    CommonModule,
    StocksRoutingModule,
    SharedModule
  ]
})
export class StocksModule { }
