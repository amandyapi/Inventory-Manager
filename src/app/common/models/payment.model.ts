import { Order } from './order.model';
export class Payment {
  private id: string;
  private type: string;
  private amount: number;
  private currency: string;
  private operator: string;
  private status: string;
  private description: string;
  private createTime: string;
}
