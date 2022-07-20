import { OrderLine } from './order-line.model';
import { Payment } from './payment.model';
export class Order {
  private id: string;
  private amount: string;
  private status: string;
  private description: string;
  private createTime: string;
  private orderLines: OrderLine[];
  private payment: Payment;
}
