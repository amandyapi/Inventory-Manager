import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cart: any[] = [
    {
      Id: '',
      Amount: 0,
      Currency: '',
      Status: 0,//awaiting payment = 0, finalized = 1
      CreateTime: '',
      UserId: '',
      OrderLines: []
    }
  ]

  constructor() {

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

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }

  searchCurrentOrder(){
    const found = this.cart.find(element => element.Status == 0);
    return found;
  }
  initCart(){

  }
}
