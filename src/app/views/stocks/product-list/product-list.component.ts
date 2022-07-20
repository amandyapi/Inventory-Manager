import { Product } from './../../../common/models/product.model';
import { StockService } from './../../../common/services/stock.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(
    private router: Router,
    private stock: StockService
  ) { }

  ngOnInit() {
  }

  getProductList(){

  }

}
