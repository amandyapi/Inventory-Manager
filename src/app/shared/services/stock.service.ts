import { SecurityService } from 'src/app/shared/services/security.service';
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
  token:any = {
    tokenType: '',
    accessToken: '',
    accessTokenExpiresOn: '',
    refreshToken: ''
  };

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
    ) {
    this.categoryList = categorieList;
    this.products = productList.data;
  }

  /** Category **/
  async createCategory(category){
    this.token = await this.securityService.customGetToken();
    console.log('stock this.token ', this.token);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.post<any>(environment.baseUrl + '/product-categories/', category,
      { responseType: 'json', headers });
  }

  getCategories(){
    return this.categoryList;
  }

  async loadCategories(){
    this.token = await this.securityService.customGetToken();
    console.log('stock this.token ', this.token);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.get<any>(environment.baseUrl + '/product-categories',
      { responseType: 'json', headers });
  }

  getCategory(CategoryId){
    let category;
    category = this.categoryList.find(element => element.Id == CategoryId);
    return category;
  }

  /** Category **/

  /** Product **/
  async loadProducts(){
    this.token = await this.securityService.customGetToken();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.get<any>(environment.baseUrl + '/products',
      { responseType: 'json', headers });
  }

  async createProduct(data){
    this.token = await this.securityService.customGetToken();
    console.log('stock this.token ', this.token);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.post<any>(environment.baseUrl + '/products/', data,
      { responseType: 'json', headers });
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

  async getProductImage(productId){
    this.token = await this.securityService.customGetToken();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.get<any>(environment.baseUrl + '/products/'+productId+'/image',
      { responseType: 'json', headers });
  }

  async updateProduct(productId, data){
    this.token = await this.securityService.customGetToken();
    console.log('stock this.token ', this.token);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.put<any>(environment.baseUrl + '/products/'+productId, data,
      { responseType: 'json', headers });
  }
  /** Product **/

}
