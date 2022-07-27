import { StockService } from './../../shared/services/stock.service';
import { OrderService } from './../../shared/services/order.service';
import { categorieList } from './../../shared/data/categories-list';
import { productList } from './../../shared/data/products-list';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  productList: any[];

  currentPage: number;
  previousPage: number;
  nextPage: number;
  totalPages: number = productList.totalPages;
  totalItemsCount: number = productList.totalItemsCount;
  pagesArray: any[] = [];

  _product: string;
  _category: string;
  categories: any[];
  cart: any[];

  constructor(
    private orderService: OrderService,
    private stockService: StockService
  ) {
    this.currentPage = 1;
    for (let i = 0; i < this.totalPages; i++) {
      this.pagesArray.push({
        number: i+1,
        current: false
      });
    }
    console.log(this.pagesArray);
    this.setCurrentPage(this.currentPage);
    this.loadProducts();
    this.loadCategories();
  }

  ngOnInit(): void {

  }

  addToCurrentCart(product){
    //alert('produit ajouté au panier');
    let cart = this.orderService.addToCart(product);
    console.log('new cart', cart);
  }

  loadProducts(){
    this.productList = this.stockService.getProducts();
    this.currentPage = 1;
    this.setCurrentPage(1);
  }

  loadCategories(){
    this._category = "all";
    this.categories = categorieList;
  }

  searchProduct(){
    let searchedProducts = this.productList.filter(item => item.Name.indexOf(this._product.toLowerCase()) != -1);
    console.clear();
    console.log('Searched items ', this._product, searchedProducts);

    if(this._product == ''){
      this.productList = productList.data;
    }
    else
    {
      this.productList = searchedProducts;
    }
  }

  filterByCategory(){
    let _searchedProductsByCategory;
    let category = this._category;
    if(category == 'all'){
      this.productList = productList.data;
    }
    else
    {
      let rawProducts = productList.data;
      _searchedProductsByCategory = rawProducts.filter(item => item.Category.indexOf(this._category.toLowerCase()) != -1);
      console.log('_category',this._category.toLowerCase(),'_searchedProductsByCategory ', _searchedProductsByCategory);
      this.productList = _searchedProductsByCategory;
    }
  }

  setCategory(){
    console.clear();
    console.log('Selected category ', this._category);
    this.filterByCategory();
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
