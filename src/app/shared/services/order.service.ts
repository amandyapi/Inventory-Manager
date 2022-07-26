import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cart: any[];

  constructor() { }

  addToCart(){

  }

  setCart(data){
    this.cart = data;
  }

  getCart() {
    return this.cart;
  }
}
