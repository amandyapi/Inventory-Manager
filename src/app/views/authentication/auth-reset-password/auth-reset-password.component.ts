import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../common/services/security.service';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private Security: SecurityService
  ) { }

  ngOnInit() {
  }

  reset(){
    this.redirectTo('/auth/change-password');
  }

  redirectTo(page){
    this.router.navigate([page]);
  }

}
