import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GeneralService } from 'src/app/shared/services/general.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { StockService } from 'src/app/shared/services/stock.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-add-new-product2',
  templateUrl: './add-new-product2.component.html',
  styleUrls: ['./add-new-product2.component.scss']
})
export class AddNewProduct2Component implements OnInit {

  categorieList: any[];
  product: any = {
    name: '',
    price: '',
    image: '',
    description: '',
    stock: 0,
    category: {}
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

  async loadCategories() {
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

  async addProduct(){
    console.clear();
    let imageData = this.product.image.replace('data:image/png;base64,', '');
    console.log('Product', this.product);
    let body:any = {
      name: this.product.name,
      code: this.product.code,
      categoryId: this.product.category,
      discountId: null,
      description: this.product.description,
      price: this.product.price,
      image: imageData,
      stockQuantity: this.product.stockQuantity
    };

    console.log('Product body', body);
    //return false;
    this.ngxService.start();
    (await this.stockService.createProduct(body))
      .toPromise()
      .then(async (res) => {
        this.toastr.success('Succes', 'Produit ajouté avec succès');
        this.ngxService.stop();
        //this.loadCategories();
        console.log('Product added', res);
      })
      .catch((err) => {
        this.ngxService.stop();
        this.toastr.error('Oops', 'Opération impossible');
      });
    this.resetProduct();
  }

  resetProduct(){
    this.product = {
      name: '',
      price: '',
      image: '',
      description: '',
      stock: 0,
      category: {}
    };
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

                console.log(img_height, img_width);

                if (img_height > max_height && img_width > max_width) {
                    imageError = 'Maximum dimentions allowed ' + max_height + '*' + max_width + 'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    cardImageBase64 = imgBase64Path;
                    console.log('cardImageBase64 ', cardImageBase64);
                    this.product.image = cardImageBase64;
                    isImageSaved = true;
                    previewImagePath = imgBase64Path;
                    return true;
                }
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
