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
    this.products = productList.data;
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
  createProduct(product){
    const Id = this.products.length+1;
    this.products.push({
      Id: Id,
      Name: product.name,
      Price: product.price,
      Image: product.image,
      Description: product.description,
      Stock: product.stock,
      Category: product.category
    });
    console.log('stock service this.products ', this.products);
    return Id;
  }
  getProducts(){
    this.products = productList.data;
    return this.products;
  }

  getProduct(productId){
    const product = this.products.find(element => element.Id == productId);
    return product;
  }
  /** Product **/
}
