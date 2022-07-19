import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  token: string;
  customToken: string = '';
  localToken = {
    value: '',
    timestamp: 0
  };
  delay: number;//900
  duration: number;
  currentDate: any = '';
  isExpired: boolean;

  user: any;
  prefix = 'security';

  baseUrl = 'http://localhost:8000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {
    this.duration = 0;
    this.delay = 900;//900
    this.isExpired = false;
   }

    /** Login **/

   async userLogin(authForm) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.baseUrl + '/security/users/login', authForm,
      { responseType: 'json', headers });
    }
    /** Login **/

    /** Forgot Password **/
    async forgotPassword(forgotForm) {
      // server
      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });

      return this.http.post<string>(this.baseUrl + '/security/users/forgotpassword', forgotForm,
        { responseType: 'json', headers });

    }
    /** Forgot Password **/

    /** Reset Password **/
    async resetPassword(resetForm) {
      // server
      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });

      return this.http.post<any>(this.baseUrl + '/security/users/resetpassword', resetForm,
        { responseType: 'json', headers });

    }
    /** Reset Password **/

    /** Get User **/
    async getUserById(userId) {

      this.token = await this.customGetToken();
      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      });

      return this.http.get<any>(this.baseUrl + '/security/users/' + userId,
        { responseType: 'json', headers });
    }
    /** Get User **/

    /** Get Token **/
    async getToken() {
      const userId = localStorage.getItem('userId');
      const userSecurityStamp = localStorage.getItem('userSecurityStamp');
      const headers = new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });

      const body = {
        securityStamp: userSecurityStamp,
      };
      const response = await this.http.post<any>(this.baseUrl + '/security/users/' + userId + '/token', body,
        { responseType: 'json', headers })
        .toPromise();
      return response.toString();
    }
    /** Get Token **/

    async customGetToken() {
      let userContext: any, customToken: any;
      if (this.isLocalTokenExpired()) {
        try {
          customToken = await this.getToken();
          //let tokenDate:any = Date.now();
          userContext = JSON.parse(sessionStorage.getItem('userContext'));
          userContext.token = customToken;
          userContext.tokenDate = this.currentDate;
          this.duration = 0;
          this.isExpired = false;
          sessionStorage.setItem('userContext', JSON.stringify(userContext));
        } catch (error) {
          this.router.navigate(['/auth/signin'], {});//Customed
          console.log('A Token error occured', error);
        }
      } else {
        userContext = JSON.parse(sessionStorage.getItem('userContext'));
        customToken = userContext.token;
        //console.log('security token date', userContext.tokenDate);
      }
      return customToken;
    }

    isLocalTokenExpired() {
      let tokenRegexp = new RegExp('[a-b0-9]+');
      let userContext;
      userContext = JSON.parse(sessionStorage.getItem('userContext'));

      this.currentDate = Date.now();
      this.duration = Math.floor(this.currentDate / 1000) - Math.floor(userContext.tokenDate / 1000);

      if (!tokenRegexp.test(userContext.token)) {
        //sessionStorage.setItem('_isAuth', JSON.stringify(false));
        //console.log('token is empty')
        this.router.navigate(['/auth/signin'], {});
        return true;
      } else {
        if (this.duration > this.delay) {
          this.isExpired = true;
        } else {
          this.isExpired = false;
        }
        //console.log('duration', this.duration)
        //console.log('isExpired', this.isExpired)
      }

      return false
    }
}
