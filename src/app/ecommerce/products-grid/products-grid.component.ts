import { productList } from './../../shared/data/products-list';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  productList: any[] = productList.data;

  currentPage: number;
  previousPage: number;
  nextPage: number;
  totalPages: number = productList.totalPages;
  totalItemsCount: number = productList.totalItemsCount;
  pagesArray: any[] = [];

  constructor() {
    this.currentPage = 1;
    let array = [1,2,3];
    for (let i = 0; i < this.totalPages; i++) {
      this.pagesArray.push({
        number: i+1,
        current: false
      });
    }
    console.log(this.pagesArray);
    this.setCurrentPage(this.currentPage);
  }

  ngOnInit(): void {

  }

  addToCurrentOrder(){
    alert('produit ajouté au panier');
  }

  loadProducts(){
    this.productList = productList.data;
    this.currentPage = 1;
    this.setCurrentPage(1);
  }

  searchProduct(){
    
  }

  getProductsByPage(pageNumber){
    console.clear();
    console.log('page array ', this.pagesArray);
    if(this.isPageExist(pageNumber)){
      console.log('Looking for page ', pageNumber);
      this.currentPage = pageNumber;
      this.setCurrentPage(pageNumber);
    }
    else{
      console.log('Looking for page ', pageNumber, ' but it does not exist');
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
    console.log('new page array', this.pagesArray);
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
