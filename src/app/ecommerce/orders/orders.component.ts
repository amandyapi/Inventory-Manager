import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders:any[];

  currentPage: number;
  previousPage: number;
  nextPage: number;
  totalPages: number;
  pageItemsCount: number;
  totalItemsCount: number;
  pagesArray: any[] = [];
  _status:any;
  filter: any = {
    Id: null,
    Status: null,
    _Status: null,
    Amount: null,
    CreatedDate: null
  };

  currentOrder: any;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private generalService: GeneralService,
    private router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
  ) {
    this.loadOrders();
    this.getCurrentOrder();
   }

  ngOnInit(): void {
    this.currentPage = 1;
    this.pageItemsCount = 10;
    this._status = -1;
    //this.getOrders(this.currentPage, this.pageItemsCount);
    //this.loadPageArray();
    //this.setCurrentPage(this.currentPage);
  }
  getCurrentOrder(){
    this.currentOrder = this.orderService.getCurrentOrder();
    //console.clear();

    console.log('Current order', this.currentOrder);
  }

  async loadOrders(){
    (await this.orderService.getOrders())
      .toPromise()
      .then(async (res) => {
        this.toastr.success('Succes', 'Opération réussie');
        let result = res;
        /*result.orders.forEach(elt => {
          this.orders.push(elt);
        });*/
        this.orders = res.orders;
        console.log('orders result', res.orders);
        this.ngxService.stop();
      })
      .catch((err) => {
        this.ngxService.stop();
        this.toastr.error('Oops', 'Opération impossible');
      });
  }

  setStatus(){
    console.log('status', this._status);
    this.orders = this.orderService.getCartByStatus(this.orders, 1, 10, this._status);
    console.log('this.orders', this.orders);
    this.currentPage = 1;
  }

  navigateToOrderDetails(order){
    this.storageService.setItem('orderDetails', order);
    console.log('order ', order);
    this.redirectTo('/ecommerce/orders-details');
  }

  redirectTo(page){
    this.router.navigate([page]);
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
    //console.log('new page array', this.currentPage);
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
      //this.getOrders(1, this.pageItemsCount);
    }
    else
    {
      //let rawProducts = this.orderService.getCartByStatus(this.orders, 1, this.orders.totalItemsCount, status);
    }
  }

  resetFilter(){
    this.filter = {
      Id: null,
      Status: null,
      _Status: null,
      Amount: null,
      CreatedDate: null
    }
    this.currentPage = 1;
    this.pageItemsCount = 10;

    //this.getOrders(this.currentPage, this.pageItemsCount);
    this.setCurrentPage(this.currentPage);
  }

}
