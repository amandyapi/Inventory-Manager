import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  
  constructor(private router: Router, private route: ActivatedRoute) { }

	// On SignIn link click
	onSignin() {
	  this.router.navigate(['sign-in'], { relativeTo: this.route.parent });
	}
  // On SignIn link click
	onForgot() {
	  this.router.navigate(['reset-password'], { relativeTo: this.route.parent });
	}


  ngOnInit(): void {
  }

}
