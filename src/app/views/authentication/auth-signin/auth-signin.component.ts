import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/common/services/security.service';
import { StorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  constructor(
    private router: Router,
    private security: SecurityService,
  ) { }

  ngOnInit() {
  }

  login(){
    this.redirectTo('/dashboard');
  }

  redirectTo(page){
    this.router.navigate([page]);
  }

}
