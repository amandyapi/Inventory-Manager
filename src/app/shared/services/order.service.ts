import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { inArray } from 'highcharts';
import { orders } from '../data/orders';
import { StorageService } from './storage.service';
import { SecurityService } from './security.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cart: any = {
    data: [],
    pageNumber: 0,
    totalPages: 0,
    totalItemsCount: 0
  };

  order: any = {
    id: '',
    phoneNumber: '',
    effectiveDate: '',
    user: '',
    amount: 0,
    orderLines: []
  };

  currentOrder: any;

  token:any = {
    tokenType: '',
    accessToken: '',
    accessTokenExpiresOn: '',
    refreshToken: ''
  };


  constructor(
    private generalService: GeneralService,
    private storageService: StorageService,
    private securityService: SecurityService,
    private http: HttpClient,
  ) {
    //this.cart.data = this.loadCart();
  }

  initCart(){
    this.order = {
      id: '',
      phoneNumber: '',
      effectiveDate: '',
      user: '',
      amount: 0,
      orderLines: []
    }
    this.storageService.setItem('order', this.order);
    console.log('order initiated', this.order)
  }

  addToCurrentCart(product){
    let found = false;
    let currentOrder = this.searchCurrentOrder();
    console.log('currentOrder ', currentOrder);
    if(currentOrder.orderLines.length == 0){
      currentOrder.orderLines.push({
        product: product,
        quantity: 1
      });
      console.log('current order lines == 0');
    }
    else if(currentOrder.orderLines.length > 0)
    {
      console.log('current order lines > 0');
      currentOrder.orderLines.forEach(elt => {
        if(elt.product.id == product.id){
          console.log('order lines > 0');
          found = true;
          elt.quantity += 1;
        }
      });
      if(found == false){
        currentOrder.orderLines.push({
          product: product,
          quantity: 1
        });
      }
    }
    let amount: number = 0;
    currentOrder.orderLines.forEach(elt => {
      amount+= elt.quantity*elt.product.price
    });
    currentOrder.amount = amount;
    if(currentOrder.id == ''){
      currentOrder.id = this.generalService.generateId();
    }
    if(currentOrder.effectiveDate == ''){
      currentOrder.effectiveDate = this.generalService.getFullDate();
    }
    this.setCart(currentOrder);
    return this.order;
  }

  setCart(data){
    this.order = data;
    this.storageService.setItem('order', data);
  }

  getCurrentOrder(){
    return this.searchCurrentOrder();
  }

  async getOrders(){
    this.token = await this.securityService.customGetToken();
    //console.log('stock this.token ', this.token);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.get<any>(environment.baseUrl + '/orders',
      { responseType: 'json', headers });
  }

  async getOrderDetails(orderId){
    this.token = await this.securityService.customGetToken();
    //console.log('stock this.token ', this.token);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });

      return this.http.get<any>(environment.baseUrl + '/orders/' + orderId,
      { responseType: 'json', headers });
  }

  getCart(data, p, i) {
    let cart = [];
    for (let index = (p-1)*i; index < p*i; index++) {
      if(data[index] !== undefined){
        cart.push(data[index]);
      }
    }
    let totalItemsCount = data.length;
    let totalPages = Math.ceil(data.length/i);
    this.cart = {
      data: cart,
      pageNumber: p,
      totalPages: totalPages,
      totalItemsCount: totalItemsCount
    }
    return this.cart;
  }

  getCartByStatus(data, p, i, status){
    let cart = [];
    for (let index = (p-1)*i; index < p*i; index++) {
      if(data[index] !== undefined){
        if(status == -1){
          cart.push(data[index]);
        }else if(status == 0 || status == 1 || status == 2){
          if(data[index].Status == status){
            cart.push(data[index]);
          }
        }
      }
    }
    let totalItemsCount = data.length;
    let totalPages = Math.ceil(data.length/i);
    this.cart = {
      data: cart,
      pageNumber: p,
      totalPages: totalPages,
      totalItemsCount: totalItemsCount
    }
    return this.cart;
  }

  getCartByFilterOptions(data, p, i, filter){
    let cart = [];
    let searchId = [];
    let searchStatus = [];
    let _searchStatus = [];
    let searchAmount = [];
    let searchDate = [];
    if(filter.Id != null){
      searchId = data.filter(item => {
       return item.Id == filter.Id;
    });
    cart = searchId;
   }else{
    cart = data;
   }

    if(filter.Status == "0" || filter.Status == "1" || filter.Status == "2"){
      const _status = parseInt(filter.Status, 10);
      console.log('_status', _status);
      searchStatus = cart.filter(item => {
        return item.Status == _status;
       });
     cart = searchStatus;
     console.log('cart 0', searchStatus);
    }else{
      console.log('cart 1', searchStatus, cart);
    }

    if(filter._Status == "0" || filter._Status == "1" || filter._Status == "2"){
      const _status = parseInt(filter._Status, 10);
      console.log('_status', _status);
      _searchStatus = cart.filter(item => {
        return item.Status == _status;
       });
     cart = _searchStatus;
     console.log('cart 0', _searchStatus);
    }else{
      console.log('cart 1', _searchStatus, cart);
    }


    if(filter.Amount != null){
      searchAmount = cart.filter(item => {
       return item.Amount == filter.Amount;
    });
    cart = searchAmount;
   }
    if(filter.CreatedDate != null){
      searchDate = cart.filter(item => {
       return item.Date == filter.CreatedDate;
    });
    cart = searchDate;

   }

   let temp = [];

   for (let index = (p-1)*i; index < p*i; index++) {
    if(cart[index] !== undefined){
      temp.push(cart[index]);
    }
   }

    let totalItemsCount = cart.length;
    let totalPages = Math.ceil(cart.length/i);
    this.cart = {
      data: temp,
      pageNumber: p,
      totalPages: totalPages,
      totalItemsCount: totalItemsCount
    }
    console.log('final cart', this.cart);
    return this.cart;
  }

  loadCart() {
    return orders.data;
  }

  clearCart() {
    this.cart = {
      data: [],
      pageNumber: 0,
      totalPages: 0,
      totalItemsCount: 0
    };
  }

  getOrder(OrderId){
    let found = null;
    found = this.cart.data.find(element => element.Id == OrderId);
    console.log('found', found);
    return found;
  }

  searchCurrentOrder(){
    let cart = JSON.parse(localStorage.getItem('order'));
    return cart;
  }

  getOrderTotalAmount(order){
    console.log('order ', order);
    let amount: number = 0;
    order.order.orderLines.forEach(elt => {
      amount += this.generalService.convertStringToAmount(elt.product.price)*elt.quantity;
    });
    return amount;
  }
}
