import { categorieList } from './../data/categories-list';
import { Injectable } from '@angular/core';
import { productList } from '../data/products-list';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  categoryList: any[];
  products: any = {
    data: [],
    pageNumber: 0,
    totalPages: 0,
    totalItemsCount: 0
  }

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
  getProducts(p=1, i=10){
    this.products = productList.data;
    let products = [];
    let data = this.products;
    for (let index = (p-1)*i; index < p*i; index++) {
      if(data[index] !== undefined){
        products.push(data[index]);
      }
    }
    let totalItemsCount = data.length;
    let totalPages = Math.ceil(data.length/i);
    this.products = {
      data: products,
      pageNumber: p,
      totalPages: totalPages,
      totalItemsCount: totalItemsCount
    }
    return this.products;
  }

  getProduct(productId){
    const product = this.products.find(element => element.Id == productId);
    return product;
  }
  /** Product **/
}
