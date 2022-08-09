import { categorieList } from './../data/categories-list';
import { Injectable } from '@angular/core';
import { productList } from '../data/products-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  token: any;

  constructor(private http: HttpClient) {
    this.categoryList = categorieList;
    this.products = productList.data;
  }

  /** Category **/
  createCategory(category){
    const Id = this.categoryList.length+1;
    this.categoryList.push({
      Id: Id,
      Name: category.Name,
      Description: category.Description
    });
    return Id;
  }

  getCategories(){
    return this.categoryList;
  }

  getCategory(CategoryId){
    let category;
    category = this.categoryList.find(element => element.Id == CategoryId);
    return category;
  }

  /** Category **/

  /** Product **/
  loadProducts(){
    const credentials: any = {
      usernameOrEmail: "ayapi@sk-automate.com",
      password: "amandyapi"
    };
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

      return this.http.get<any>(environment.baseUrl + '/products',
      { responseType: 'json', headers });
  }

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
    //console.log('this.products', this.products);
    let product;
    product = this.products.data.find(element => element.Id == productId);
    return product;
  }

  updateProduct(productId, data){
    this.products.data.forEach(elt => {
      if(elt.Id == productId){
        elt=data;
      }
    });
    let product;
    product = this.products.data.find(element => element.Id == productId);
    console.log('product', product);
    return true;
  }
  /** Product **/
}
