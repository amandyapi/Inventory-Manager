import { StockService } from './../../shared/services/stock.service';
import { OrderService } from './../../shared/services/order.service';
import { categorieList } from './../../shared/data/categories-list';
import { productList } from './../../shared/data/products-list';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit {
  productList: any;

  currentPage: number;
  previousPage: number;
  nextPage: number;
  totalPages: number = productList.totalPages;
  totalItemsCount: number = productList.totalItemsCount;
  pageItemsCount: number;
  pagesArray: any[] = [];

  _product: string;
  currentProduct:any;
  _category: string;
  categories: any[];
  cart: any[];

  closeResult = '';

  constructor(
    private orderService: OrderService,
    private stockService: StockService,
    private modalService: NgbModal
  ) {
    this.currentPage = 1;
    this.pageItemsCount = 7;

    console.log(this.pagesArray);
    this.getProductsByPage(this.currentPage, this.pageItemsCount);
    this.loadCategories();

    console.log('products', this.productList);
    this.initPagesArray();
    this.setCurrentPage(this.currentPage);
  }

  ngOnInit(): void {

  }

  initPagesArray(){
    for (let i = 0; i < this.productList.totalPages; i++) {
      this.pagesArray.push({
        number: i+1,
        current: false
      });
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  addToCurrentCart(product){
    //alert('produit ajouté au panier');
    let cart = this.orderService.addToCart(product);
    //console.log('new cart', cart);
  }

  loadCategories(){
    this._category = "all";
    this.categories = categorieList;
    console.log('this.categories', this.categories);
  }

  searchProduct(){
    let searchedProducts = this.productList.filter(item => item.Name.toLowerCase().indexOf(this._product.toLowerCase()) != -1);
    //console.clear();
    console.log('Searched items ', this._product, this._product.toLowerCase(), searchedProducts);

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
      _searchedProductsByCategory = rawProducts.filter(item => item.Category.Name.indexOf(this._category.toLowerCase()) != -1);
      console.log('_category',this._category.toLowerCase(),'_searchedProductsByCategory ', _searchedProductsByCategory);
      this.productList = _searchedProductsByCategory;
    }
  }

  setCategory(){
    console.clear();
    console.log('Selected category ', this._category);
    this.filterByCategory();
  }

  getProductsByPage(pageNumber, items){
    console.clear();
    console.log('pageNumber', pageNumber, 'items', items);
    if(this.isPageExist(pageNumber)){
      console.log('Looking for page ', pageNumber);
      this.currentPage = pageNumber;
      this.setCurrentPage(pageNumber);
      this.productList = this.stockService.getProducts(pageNumber, items);
    }
    else{
      console.log('Looking for page ', pageNumber, ' but it does not exist');
    }
    console.log('productList', this.productList);
  }

  getProductDetails(productId){
    console.clear();
    this.currentProduct = this.stockService.getProduct(productId);
    console.log('currentProduct', this.currentProduct);
  }

  getProductDetailsCategory(){
    let category = this.stockService.getCategory(this.currentProduct.Category.Id);
    this.currentProduct.Category = category;
    console.log('this.currentProduct.category', this.currentProduct.Category);
  }

  editProduct(){
    console.log('edit product', this.currentProduct);
    this.stockService.updateProduct(this.currentProduct.Id, this.currentProduct)
    this.modalService.dismissAll();
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

  fileChangeEvent(fileInput: any) {
    let imageError = null;
    let cardImageBase64;
    let isImageSaved;
    let previewImagePath;

    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;

            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                if (img_height > max_height && img_width > max_width) {
                    imageError = 'Maximum dimentions allowed ' + max_height + '*' + max_width + 'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    cardImageBase64 = imgBase64Path;
                    //console.log('cardImageBase64 ', cardImageBase64);
                    this.currentProduct.Image = cardImageBase64;
                    isImageSaved = true;
                    previewImagePath = imgBase64Path;
                    return true;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
        console.log('current product ', this.currentProduct);
    }
  }

}
