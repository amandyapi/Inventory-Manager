import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  token: string;
  localToken = {
    value: '',
    timestamp: 0
  };

  externalOperationSubject = new Subject<any>();
  externalOperation: any;

  constructor(
    private http: HttpClient,
    private security: SecurityService
  ) { }

  async getState(Operator, Id) {
    const customToken = this.security.getLocalToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + customToken.accessToken.toString()
    });

    return this.http.get<any>(environment.baseUrl + '/'+ Operator +'/transactions/' + Id + '/state',
      { responseType: 'json', headers });
  }

  /**** MTN  ****/
  async getMtnState(externalId) {
    //const customToken = await this.security.getToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(environment.baseUrl + '/mtn/transactions/' + externalId + '/state',
      { responseType: 'json', headers });
  }

  async mtnRequestToPay(transaction) {
    const customToken = this.security.getLocalToken();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + customToken.accessToken.toString()
    });

    return this.http.post<any>(environment.baseUrl + '/mtn/transactions/request-to-pay', transaction,
      { responseType: 'json', headers });
  }

  /**** MTN  ****/

  /**** ORANGE  ****/

  async getOrangeState(orderId) {
    //const customToken = await this.security.getToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(environment.baseUrl + '/orange/transactions/' + orderId + '/state',
      { responseType: 'json', headers });
  }

  async orangeWebPayment(transaction) {
    const customToken = this.security.getLocalToken();

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + customToken.accessToken.toString()
    });

    return this.http.post<any>(environment.baseUrl + '/orange/transactions/webpayment', transaction,
      { responseType: 'json', headers });
  }

  /**** ORANGE  ****/

  /**** TRANSACTION  ****/
  async getTransactionState(externalId) {
    //const customToken = await this.security.getToken();
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(environment.baseUrl + '/transactions/' + externalId + '/state',
      { responseType: 'json', headers });
  }
  /**** TRANSACTION  ****/

  setExternalOperation(data){
    this.externalOperation = data;
    this.emitExternalOperation();
  }

  emitExternalOperation(){
    this.externalOperationSubject.next(this.externalOperation);
  }
}
