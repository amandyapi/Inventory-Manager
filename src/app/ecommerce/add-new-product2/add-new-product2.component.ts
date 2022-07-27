import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/shared/services/stock.service';

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
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.categorieList = this.stockService.getCategories();
    console.log('categorie List', this.categorieList);
  }

  addProduct(){
    console.clear();
    console.log('Product ', this.product);
    this.stockService.createProduct(this.product);
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
