import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    redirect: string = '';
    user: any = {
      Id: '',
      FirstName: '',
      Email: '',
      PhoneNumber: '',
      Username: '',
      Password: '',
      Role: 1,
      Image: ''
    }

    constructor(private router: Router, private route: ActivatedRoute) {
       this.redirect = 'ecommerce/products-grid';
    }

     ngOnInit(): void {

     }

    // On Forgotpassword link click
    onForgotpassword() {
      this.router.navigate(['forgot-password']);
    }

    // On Signup link click
    onSignup() {
      this.router.navigate(['sign-up']);
    }

    onSignIn() {
      console.log('User', this.user);
      console.log('User', this.redirect);
      this.router.navigate(['ecommerce/products-grid']);
    }
}
