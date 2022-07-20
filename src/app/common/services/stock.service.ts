import { Data } from './../models/data.model';
import { Product } from './../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { SecurityService } from './security.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl = 'http://localhost:8000';
  token: Data;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService,
    private security: SecurityService
  ) { }

  /** **/

  async getCategoryList(){
    let _customToken = await this.security.customGetToken();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.get<Category[]>(this.baseUrl + '/stocks/category',
      { responseType: 'json', headers });
  }

  async getCategory(CategoryId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.get<Category>(this.baseUrl + '/stocks/category/' + CategoryId,
      { responseType: 'json', headers });
  }

  async addCategory(CategoryData){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.post<any>(this.baseUrl + '/stocks/category', CategoryData,
      { responseType: 'json', headers });
  }

  async updateCategory(CategoryData, CategoryId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.put<any>(this.baseUrl + '/stocks/category/' + CategoryId, CategoryData,
      { responseType: 'json', headers });
  }

  async deleteCategory(CategoryId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.delete<any>(this.baseUrl + '/stocks/category/' + CategoryId,
      { responseType: 'json', headers });
  }

  /** **/

  /** **/
  async getProducts(){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.get<Product[]>(this.baseUrl + '/stocks/products',
      { responseType: 'json', headers });
  }

  async getProductsByCategory(CategoryId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.get<Product[]>(this.baseUrl + '/stocks/products/'+CategoryId,
      { responseType: 'json', headers });
  }

  async getProduct(ProductId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.get<Product>(this.baseUrl + '/stocks/products/'+ProductId,
      { responseType: 'json', headers });
  }

  async addProduct(ProductData: Product){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.post<any>(this.baseUrl + '/stocks/products', ProductData,
      { responseType: 'json', headers });
  }

  async updateProduct(ProductData, ProductId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.put<any>(this.baseUrl + '/stocks/products'+ProductId, ProductData,
      { responseType: 'json', headers });
  }

  async deleteProduct(ProductId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.delete<Product>(this.baseUrl + '/stocks/products/'+ProductId,
      { responseType: 'json', headers });
  }

  async archiveProduct(ProductId){
    let _customToken = await this.security.customGetToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + _customToken
    });

    return this.http.put<Product>(this.baseUrl + '/stocks/products/'+ProductId+'/archive',
      { responseType: 'json', headers });
  }
  /** **/
}
