import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GeneralService } from 'src/app/shared/services/general.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { StorageService } from 'src/app/shared/services/storage.service';


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

    constructor(
      private router: Router,
      private orderService: OrderService,
      private generalService: GeneralService,
      private storageService: StorageService,
      private securityService: SecurityService,
      private modalService: NgbModal,
      private toastr: ToastrService,
      private ngxService: NgxUiLoaderService,
      private operationService: OperationService
      ) {
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

    async login(){
      this.ngxService.start();
      (await this.securityService.userLogin(this.user))
        .toPromise()
        .then(async (res) => {
          this.toastr.success('Succes', 'Connexion réussie');
          this.ngxService.stop();
          let User = res;
          console.log('User ', User);
          this.storageService.setItem('user', this.user);
          this.router.navigate(['ecommerce/products-grid']);
        })
        .catch((err) => {
          this.ngxService.stop();
          this.toastr.error('Oops', 'Connexion impossible');
        });
    }
}
