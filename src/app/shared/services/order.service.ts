import { GeneralService } from './general.service';
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
  };

  currentOrder: any;

  constructor(
    private generalService: GeneralService
  ) {
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
    console.log('this.cart', this.cart);
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

  getCartByFilterOptions(p, i, filter){
    let cart = [];
    let data = this.loadCart();
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
    let cart = this.loadCart();
    console.log('cart ', this.cart);
    let found = null;
    found = cart.find(element => element.Status == 2);
    console.log('found', found);
    return found;
  }
  initCart(){

  }

  getOrderTotalAmount(order){
    console.log('order', order);
    let amount: number = 0;
    order.OrderLines.forEach(elt => {
      amount += this.generalService.convertStringToAmount(elt.Product.Price)*elt.Quantity;
    });
    return amount;
  }
}
