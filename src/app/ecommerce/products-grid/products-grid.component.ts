import { StockService } from './../../shared/services/stock.service';
import { OrderService } from './../../shared/services/order.service';
import { categorieList } from './../../shared/data/categories-list';
import { productList } from './../../shared/data/products-list';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { OperationService } from 'src/app/shared/services/operation.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
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
  currentProduct: any;
  _category: string;
  categories: any[];
  cart: any[];

  closeResult = '';

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
  ) {
    this.currentPage = 1;
    this.pageItemsCount = 7;

    console.log(this.pagesArray);
    this.loadCategories();
    this.getProducts();
    //this.getProductsByPage(this.currentPage, this.pageItemsCount);

    //console.log('products', this.productList);
    //this.initPagesArray();
    //this.setCurrentPage(this.currentPage);
  }

  ngOnInit(): void {}

  initPagesArray() {
    for (let i = 0; i < this.productList.totalPages; i++) {
      this.pagesArray.push({
        number: i + 1,
        current: false,
      });
    }
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed`;
        }
      );
  }

  addToCurrentCart(product) {
    //alert('produit ajouté au panier');
    let cart = this.orderService.addToCart(product);
    //console.log('new cart', cart);
  }

  async loadCategories() {
    this._category = 'all';
    this.categories = categorieList;
    this.ngxService.start();
    (await this.stockService.loadCategories())
      .toPromise()
      .then(async (res) => {
        this.toastr.success('Succes', 'Opération réussie');
        this.ngxService.stop();
        this.categories = res;

        console.log('this.categories ', this.categories);
        this.storageService.setItem('categories', this.categories);
      })
      .catch((err) => {
        this.ngxService.stop();
        this.toastr.error('Oops', 'Opération impossible');
      });
  }

  searchProduct() {
    let searchedProducts = this.productList.filter(
      (item) =>
        item.Name.toLowerCase().indexOf(this._product.toLowerCase()) != -1
    );
    //console.clear();
    console.log(
      'Searched items ',
      this._product,
      this._product.toLowerCase(),
      searchedProducts
    );

    if (this._product == '') {
      this.productList = productList.data;
    } else {
      this.productList = searchedProducts;
    }
  }

  filterByCategory() {
    let _searchedProductsByCategory;
    let category = this._category;
    if (category == 'all') {
      this.productList = productList.data;
    } else {
      let rawProducts = productList.data;
      _searchedProductsByCategory = rawProducts.filter(
        (item) => item.Category.Name.indexOf(this._category.toLowerCase()) != -1
      );
      console.log(
        '_category',
        this._category.toLowerCase(),
        '_searchedProductsByCategory ',
        _searchedProductsByCategory
      );
      this.productList = _searchedProductsByCategory;
    }
  }

  setCategory() {
    console.clear();
    console.log('Selected category ', this._category);
    this.filterByCategory();
  }

  async getProducts() {
    this.ngxService.start();
    (await this.stockService.loadProducts())
      .toPromise()
      .then(async (res) => {
        console.clear();
        //console.log('products', res);
        this.toastr.success('Succes', 'Opération réussie');
        this.ngxService.stop();
        this.productList = res;
        this.productList.forEach(elt => {
          elt.category = this.setProductCategory(elt.categoryId);
          elt.image = 'assets/images/products/placeholder.jpg';
          this.setProductPicture(elt.id);
        });
        console.log('this.productList ', this.productList);
        this.storageService.setItem('productList', this.productList);
      })
      .catch((err) => {
        this.ngxService.stop();
        this.toastr.error('Oops', 'Connexion impossible');
      });
  }

  setProductCategory(categoryId){
    let category;
    category = this.categories.find(element => element.id == categoryId);
    console.log('this.productList ', this.productList);
    console.log('currentCategory', category);
    return category;
  }

  async setProductPicture(productId){
    //this.ngxService.start();
    (await this.stockService.getProductImage(productId))
      .toPromise()
      .then(async (res) => {
        //this.toastr.success('Succes', 'Opération réussie');
        //this.ngxService.stop();
        console.clear();
        console.log('this.productList ', this.productList);
        //console.log('result data', res.data);
        let imageData = 'data:image/png;base64,'+res.data;
        this.productList.forEach(elt => {
          if(elt.id == productId){
            console.log('found', true);
            elt.image = imageData;
          }
        });
      })
      .catch((err) => {
        //this.ngxService.stop();
        //this.toastr.error('Oops', 'Connexion impossible');
      });
  }

  getProductsByPage(pageNumber, items) {
    console.clear();
    console.log('pageNumber', pageNumber, 'items', items);
    if (this.isPageExist(pageNumber)) {
      console.log('Looking for page ', pageNumber);
      this.currentPage = pageNumber;
      this.setCurrentPage(pageNumber);
      this.productList = this.stockService.getProducts(pageNumber, items);
    } else {
      console.log('Looking for page ', pageNumber, ' but it does not exist');
    }
    console.log('productList', this.productList);
  }

  getProductDetails(productId) {
    console.clear();
    let product;
    product = this.productList.find(element => element.id == productId);
    this.currentProduct = product;
    console.log('productId', productId);
    console.log('currentProduct', this.currentProduct, product);
  }

  getProductDetailsCategory() {
    let category = this.stockService.getCategory(
      this.currentProduct.category.id
    );
    this.currentProduct.Category = category;
    console.log('this.currentProduct.category', this.currentProduct.Category);
  }

  async editProduct() {
    let imageData = this.currentProduct.image;
    //this.currentProduct.image = imageData.replace('data:image/png;base64,', '');
    let body: any = {
      id: this.currentProduct.id,
      categoryId: this.currentProduct.category.id,
      discountId: null,
      code: this.currentProduct.code,
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      image: imageData.replace('data:image/png;base64,', ''),
      stockQuantity: this.currentProduct.stockQuantity
    }
    console.log('edit product body', body);
    //this.stockService.updateProduct(this.currentProduct.id, this.currentProduct);
    this.modalService.dismissAll();
    this.ngxService.start();
    (await this.stockService.updateProduct(body.id, body))
      .toPromise()
      .then(async (res) => {
        this.toastr.success('Success', 'Mise à jour réussie');
        this.ngxService.stop();
        console.clear();
        console.log('update product', res);
        //console.log('result data', res.data);
      })
      .catch((err) => {
        this.ngxService.stop();
        this.toastr.error('Oops', 'Operation impossible');
      });
  }

  setCurrentPage(currentPage) {
    this.pagesArray.forEach((element) => {
      if (element.number == currentPage) {
        element.current = true;
      } else {
        element.current = false;
      }
    });
    console.log('new page array', this.pagesArray);
  }

  isPageExist(page) {
    let result: boolean;
    if (page < this.totalPages + 1 && page > 0) {
      result = true;
    } else {
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

        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            cardImageBase64 = imgBase64Path;
            //console.log('cardImageBase64 ', cardImageBase64);
            this.currentProduct.image = cardImageBase64;
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
