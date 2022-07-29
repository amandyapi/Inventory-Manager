import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../shared/services/storage.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  order: any;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.order = this.storageService.getItem('orderDetails');
    console.log('orderDetails', this.order);
  }

}
