import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../shared/services/storage.service';

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
  _status:any;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.pageItemsCount = 10;
    this._status = -1;
    this.getOrders(this.currentPage, this.pageItemsCount);
    this.loadPageArray();
    this.setCurrentPage(this.currentPage);
  }

  getOrders(p, i){
    this.currentPage = p;
    console.log('currentPage', p, 'pageItemsCount', i);
    this.orders = this.orderService.getCartByStatus(p, i, this._status);
    console.log('orders ', this.orders);
    this.setCurrentPage(p);
  }

  setStatus(){
    console.log('status', this._status);
    this.orders = this.orderService.getCartByStatus(1, 10, this._status);
    console.log('this.orders', this.orders);
    this.currentPage = 1;
  }

  getOrdersByStatus(p, i, status){
    this.currentPage = p;
    console.log('currentPage', p, 'pageItemsCount', i);
    this.orders = this.orderService.getCartByStatus(p, i, status);
    console.log('orders ', this.orders);
    this.setCurrentPage(p);
  }

  navigateToOrderDetails(order){
    this.storageService.setItem('orderDetails', order);
    this.redirectTo('/ecommerce/orders-details');
  }

  changePageItems(){
    console.log('this.pageItemsCount', this.pageItemsCount);
    this.currentPage = 1;
    this.getOrdersByStatus(this.currentPage, this.pageItemsCount, this._status);
  }

  redirectTo(page){
    this.router.navigate([page]);
  }

  loadPageArray(){
    for (let i = 0; i < this.orders.totalPages; i++) {
      this.pagesArray.push({
        number: i+1,
        current: false
      });
    }
    console.log('pagesArray', this.pagesArray);
  }

  filterBy(term){
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

  setCurrentPage(currentPage){
    this.pagesArray.forEach(element => {
      if(element.number == currentPage){
        element.current = true;
      }
      else{
        element.current = false;
      }
    });
    console.log('new page array', this.currentPage);
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

  filterByStatus(){
    let _searchedProductsByCategory;
    let status = this._status;
    if(status == 'all'){
      this.getOrders(1, this.pageItemsCount);
    }
    else
    {
      let rawProducts = this.orderService.getCartByStatus(1, this.orders.totalItemsCount, status);
    }
  }

}
