import { categorieList } from './../data/categories-list';
import { Injectable } from '@angular/core';
import { productList } from '../data/products-list';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  products: any[];
  categoryList: any[];

  constructor() {
    this.categoryList = categorieList;
  }

  /** Category **/
  createCategory(category){
    const Id = this.categoryList.length+1;
    this.categoryList.push({
      id: Id,
      name: category.name,
      description: category.description
    });
    return Id;
  }

  getCategories(){
    return this.categoryList;
  }

  getCategory(CategoryId){}

  /** Category **/

  /** Product **/
  getProducts(){
    this.products = productList.data;
    return this.products;
  }
  /** Product **/
}
