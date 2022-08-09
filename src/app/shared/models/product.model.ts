import { DiscountModel } from './discount.model';
import { CategoryModel } from './category.model';
export class ProductModel {
  id: string;
  name: string;
  category: CategoryModel;
  discount: DiscountModel;
  code: string;
  description: string;
  price: number;
  image:any;
}
