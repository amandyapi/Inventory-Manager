import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:any;
  currentPage: number;
  previousPage: number;
  nextPage: number;
  totalPages: number;
  pageItemsCount: number;
  totalItemsCount: number;
  pagesArray: any[] = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.pageItemsCount = 10;
    this.getOrders(this.currentPage, this.pageItemsCount);
    this.loadPageArray();
  }

  getOrders(p, i){
    this.orders = this.orderService.getCart(p, i);
    console.log('orders ', this.orders);
  }

  loadPageArray(){
    for (let i = 0; i < this.orders.totalPages; i++) {
      this.pagesArray.push({
        number: i+1,
        current: false
      });
    }
  }

  filterByStatus(term){
    switch (term) {
      case 'id':

        break;
      case 'amount':

        break;
      case 'status':

        break;
      case 'date':

        break;

      default:
        break;
    }
  }

  setCurrentPage(page){

  }

  isPageExist(page){
    let result: boolean;
    if(page < this.totalPages+1 && page > 0){
      result = true;
    }
    else{
      result = false;
    }
    return result;
  }

}
