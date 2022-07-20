import { Category } from './category.model';
export class Product {
  private id: string;
  private name: string;
  private code: string;
  private description: string;
  private price: number;
  private picture: string;
  private status: string;
  private stock: string;
  private createTime: string;
  private category: Category;
}
