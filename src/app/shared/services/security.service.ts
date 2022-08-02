import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  token: string;
  delay: number;
  duration: number;
  isExpired: boolean;
  currentDate: any = '';

  customToken = {
    value: '',
    timestamp: 0
  };
  userContext: any;

  myToken = {
    tokenType: '',
    accessToken: '',
    accessTokenExpiresOn: '',
    refreshToken: ''
  };

  constructor(private http: HttpClient) {
    this.duration = 0;
    this.delay = 900;//900
    this.isExpired = false;
   }

   cleanLocalToken(){
    localStorage.setItem('customToken', JSON.stringify(this.myToken));
  }

  setLocalToken(customToken){
    localStorage.setItem('customToken', JSON.stringify(customToken));
  }

  getLocalToken(){
    const myToken = JSON.parse(localStorage.getItem('customToken'));
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
    });


    const response = this.http.post<any>(environment.baseUrl + '/oauth/token', credentials,
      { responseType: 'json', headers })
      .toPromise();
      //console.log('response', response);
      return response;
  }

  async userLogin() {
    //console.log('Auth ss', authForm);
    const credentials: any = {
      usernameOrEmail: 'ayapi@sk-automate.com',
      password: 'amandyapi'
    };
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(environment.baseUrl + '/oauth/login', credentials,
      { responseType: 'json', headers });
  }

  /**** OAUTH  ****/

  async customGetToken(_refreshToken) {
    this.customToken = JSON.parse(localStorage.getItem('token'));
    console.log('customGetToken', this.customToken);
    if (this.isLocalTokenExpired()) {
      console.log('token Is Expired');
      try {
        this.customToken.value = await this.getToken(_refreshToken);
        this.customToken.timestamp = Date.now();
        this.duration = 0;
        this.isExpired = false;
        localStorage.setItem('token', JSON.stringify(this.customToken));
        console.log('this.customToken new', this.customToken);
        console.log('customToken 001', this.customToken);
      } catch (error) {
        //this.router.navigate(['/auth/signin'], {});//Customed
        console.log('A Token error occured', error);
      }
    } else {
      this.customToken = JSON.parse(sessionStorage.getItem('token'));
      console.log('token Is valid', this.customToken);
    }
    return this.customToken.value;
  }

  isLocalTokenExpired() {
    const tokenRegexp = new RegExp('[a-b0-9]+');
    /*this.customToken = JSON.parse(localStorage.getItem('token'));
    console.log('customToken 002', this.customToken);*/
    this.currentDate = Date.now();
    this.duration = Math.floor(this.currentDate / 1000) - Math.floor(this.customToken.timestamp / 1000);

    if (!tokenRegexp.test(this.customToken.value)) {
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
