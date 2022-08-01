import { StockService } from './../../shared/services/stock.service';
import { categorieList } from './../../shared/data/categories-list';
import { Component, OnInit } from '@angular/core';

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
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.categorieList = this.stockService.getCategories();
    console.log('categorie List', this.categorieList);
  }

  addCategory(){
    console.log('new category', this.category);
    this.stockService.createCategory(this.category);
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

}
