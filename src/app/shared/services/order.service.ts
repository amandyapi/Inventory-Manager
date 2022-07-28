import { Injectable } from '@angular/core';
import { inArray } from 'highcharts';
import { orders } from '../data/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cart: any = {
    data: [],
    pageNumber: 0,
    totalPages: 0,
    totalItemsCount: 0
  }

  currentOrder: any;

  constructor() {
    this.cart = this.loadCart();
  }

  addToCart(product){
    console.clear();
    let found = false;
    let currentOrder = this.searchCurrentOrder();

    if(currentOrder.OrderLines.length == 0){
      currentOrder.OrderLines.push({
        Product: product,
        Quantity: 1
      });
      console.log('current order lines == 0');
    }
    else if(currentOrder.OrderLines.length > 0)
    {
      console.log('current order lines > 0');
      currentOrder.OrderLines.forEach(elt => {
        if(elt.Product.Id == product.Id){
          console.log('order lines > 0');
          found = true;
          elt.Quantity += 1;
        }
      });
      if(found == false){
        currentOrder.OrderLines.push({
          Product: product,
          Quantity: 1
        });
      }
    }
    this.cart.forEach(element => {
      if(element.Id == currentOrder.Id){
        element = currentOrder;
      }
    });
    return this.cart;
  }

  setCart(data){
    this.cart = data;
  }

  getCurrentOrder(){
    return this.searchCurrentOrder();
  }

  getCart(p, i) {
    let cart = [];
    let data = this.loadCart();
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
  getCartByStatus(p, i, status){
    let cart = [];
    let data = this.loadCart();
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

  loadCart() {
    return orders.data;
  }

  clearCart() {
    this.cart = [];
  }

  searchCurrentOrder(){
    const found = this.cart.find(element => element.Status == 2);
    return found;
  }
  initCart(){

  }
}
