import { StockService } from './../../shared/services/stock.service';
import { categorieList } from './../../shared/data/categories-list';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OperationService } from 'src/app/shared/services/operation.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categorieList: any[];
  category: any = {
    Name: '',
    Description: ''
  };

  constructor(
    private orderService: OrderService,
    private stockService: StockService,
    private modalService: NgbModal,
    private router: Router,
    private generalService: GeneralService,
    private storageService: StorageService,
    private securityService: SecurityService,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private operationService: OperationService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  async addCategory(){
    console.clear();
    console.log('Category ', this.category);
    this.ngxService.start();
    (await this.stockService.createCategory(this.category))
      .toPromise()
      .then(async (res) => {
        this.toastr.success('Succes', 'Opération réussie');
        this.ngxService.stop();
        this.loadCategories();
        console.log('Category added', res);
      })
      .catch((err) => {
        this.ngxService.stop();
        this.toastr.error('Oops', 'Opération impossible');
      });

  }

  getCategoryDetails(category){
    this.category = category;
  }

  resetCategory(){
    this.category = {
      Name: '',
      Description: ''
    };
  }

  async loadCategories() {
    this.categorieList = categorieList;
    this.ngxService.start();
    (await this.stockService.loadCategories())
      .toPromise()
      .then(async (res) => {
        this.toastr.success('Succes', 'Opération réussie');
        this.ngxService.stop();
        this.categorieList = res;

        console.log('this.categories ', this.categorieList);
        this.storageService.setItem('categories', this.categorieList);
      })
      .catch((err) => {
        this.ngxService.stop();
        this.toastr.error('Oops', 'Opération impossible');
      });
  }

}
