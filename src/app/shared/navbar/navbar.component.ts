import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GeneralService } from '../services/general.service';
import { OperationService } from '../services/operation.service';
import { OrderService } from '../services/order.service';
import { SecurityService } from '../services/security.service';
import { StorageService } from '../services/storage.service';
import { SidebarService } from '../sidebar/sidebar.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
    user: any;

    constructor(
      public sidebarservice: SidebarService,
      private router: Router,
      private orderService: OrderService,
      private generalService: GeneralService,
      private storageService: StorageService,
      private securityService: SecurityService,
      private modalService: NgbModal,
      private toastr: ToastrService,
      private ngxService: NgxUiLoaderService,
      private operationService: OperationService
      ) { }

    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".search-toggle-icon").on("click", function() {
                $(".top-header .navbar form").addClass("full-searchbar")
            })
            $(".search-close-icon").on("click", function() {
                $(".top-header .navbar form").removeClass("full-searchbar")
            })

        });

        this.user = this.storageService.getItem('user');
        console.log('nav user ', this.user);
    }

    logout(){
      this.storageService.clearAll();
      this.router.navigate(['auth/sign-in']);
    }
}
