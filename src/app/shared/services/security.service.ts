import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  delay: number;
  duration: number;
  isExpired: boolean;
  currentDate: any = '';

  customToken = {
    value: '',
    timestamp: 0
  };
  userContext: any;

  token:any = {
    tokenType: '',
    accessToken: '',
    accessTokenExpiresOn: '',
    refreshToken: ''
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService
    ) {
    this.duration = 0;
    this.delay = 900;//900
    this.isExpired = false;
   }

   cleanLocalToken(){
    localStorage.setItem('token', JSON.stringify(this.token));
  }

  setLocalToken(token){
    localStorage.setItem('token', JSON.stringify(token));
  }

  getLocalToken(){
    const myToken = JSON.parse(localStorage.getItem('token'));
    //console.log('myToken', myToken);
    return myToken;
  }

  /**** OAUTH  ****/

  async getToken(_refreshToken) {
    const credentials: any = {
      refreshToken: _refreshToken
    };
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });


    const response = this.http.post<any>(environment.baseUrl + '/oauth/token', credentials,
      { responseType: 'json', headers })
      .toPromise();
      //console.log('response', response);
      return response;
  }

  async getNewToken() {
    const credentials: any = {
      usernameOrEmail: 'ayapi@sk-automate.com',
      password: 'amandyapi'
    };
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token.accessToken
    });


    const response = this.http.post<any>(environment.baseUrl + '/oauth/login', credentials,
      { responseType: 'json', headers })
      .toPromise();
      //console.log('response', response);
      return response;
  }

  async userLogin(body) {
    //console.log('Auth ss', authForm);
    const credentials: any = {
      usernameOrEmail: body.Username,
      password: body.Password
    };
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(environment.baseUrl + '/oauth/login', credentials,
      { responseType: 'json', headers });
  }

  /**** OAUTH  ****/

  async customGetToken() {
    this.token = this.getLocalToken();
    //console.log('custom Token', this.token);
    if (this.isLocalTokenExpired()) {
      //console.log('token Is Expired');
      try {
        this.token = await this.getNewToken();
        //this.token = await this.getToken(this.token.refreshToken);

        this.isExpired = false;
        this.storageService.setItem('token', this.token);
        //console.log('token refreshed new', this.token);
        return this.token;
      } catch (error) {
        //this.router.navigate(['/auth/signin'], {});//Customed
        //console.log('A Token error occured', error);
        return false;
      }
    } else {
      this.token = this.getLocalToken();
      //console.log('token Is valid', this.token);
      return this.token;
    }
    //return this.token;
  }

  isLocalTokenExpired() {
    const tokenRegexp = new RegExp('[a-b0-9]+');
    this.token = this.getLocalToken();
    /*this.customToken = JSON.parse(localStorage.getItem('token'));
    */
    this.currentDate = Date.now();
    let _timestamp: number =  new Date(this.token.accessTokenExpiresOn).getTime()
    //console.log('customToken 002', this.token.accessTokenExpiresOn, _timestamp);
    this.duration = Math.floor(this.currentDate / 1000) - Math.floor(_timestamp / 1000);

    if (!tokenRegexp.test(this.token.accessTokenExpiresOn)) {
      this.isExpired = true;
    } else {
      if (this.duration > this.delay) {
        this.isExpired = true;
      } else {
        this.isExpired = false;
      }
    }

    return this.isExpired;
  }
}
