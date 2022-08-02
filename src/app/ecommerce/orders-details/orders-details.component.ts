import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../shared/services/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  order: any;
  closeResult = '';

  constructor(
    private orderService: OrderService,
    private storageService: StorageService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.order = this.storageService.getItem('orderDetails');
    console.log('orderDetails', this.order);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

}
