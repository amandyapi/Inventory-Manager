import { Data } from './data.model';
export class UserContext {
  private id: string;
  private firstname: string;
  private lastname: string;
  private email: string;
  private username: string;
  private password: string;
  private role: string;
  private active: boolean;
  private createTime: boolean;
  private resetOtp: Data;
  private token: Data;
}
