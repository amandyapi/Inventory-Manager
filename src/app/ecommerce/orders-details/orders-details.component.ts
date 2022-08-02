import { OperationService } from './../../shared/services/operation.service';
import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../shared/services/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from './../../shared/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss'],
})
export class OrdersDetailsComponent implements OnInit {
  order: any;
  closeResult = '';
  orderDate: any;

  testUrl= 'assets/common/img/operateurs/mtn-ci.png';

  operatorUrl = 'assets/common/img/operateurs/';

  orange = '';
  mtn = '';
  moov = '';

  orangeRegular = 'OrangeMoney.png';
  mtnRegular = 'mtn-ci.png';
  moovRegular = 'moovmoney.png';

  orangewhite = 'OrangeMoney-white.png';
  mtnwhite = 'mtn-ci-white.png';
  moovwhite = 'moovmoney-white.png';

  operator: any = '';
  service = '';

  public transaction: any = {
    Amount: null,
    PhoneNumber: '',
  };

  isTransactionEnable = false;
  isTransactionFinished = false;

  delay: number; //900
  duration: number;
  currentDate: any = '';

  isExpired: boolean;
  isAmountValid = true;
  isPhoneNumberValid = true;
  isOperatorValid = true;
  isFormValid: boolean;

  counter = 120; //Set to 120
  initTransactionTimeOut = false;
  initTransactionCounter = 120; //Set to 120
  initConnectionCounter = 20; //Set to 120

  cronCounter = 30;
  cronIntervalId: any;
  cronActivated: boolean;
  pendingToast = false;

  isRefreshEnable = false;

  connectionTimeOut = true;
  // eslint-disable-next-line max-len
  reasons: string[] = [
    'Bénéficiaire introuvable',
    'Payeur introuvable',
    'Interdit',
    'Environnement cible non autorisé',
    'Hôte URL de rappel non valide',
    'Devise invalide',
    'Service indisponible',
    'Erreur de traitement interne',
    'Pas assez de fonds',
    'Limite de payeur atteinte',
    'Bénéficiaire non autorisé à recevoir',
    'Paiement non approuvé',
    'Ressource introuvable',
    'Approbation rejetée',
    'Expirer',
    'Transaction annulée',
    'La ressource existe déjà',
  ];

  transactionLabel = 'Transaction Orange';

  customToken = {
    tokenType: '',
    accessToken: '',
    accessTokenExpiresOn: '',
    refreshToken: '',
  };

  orangeOperation: any;
  mtnOperation: any;

  redirectUrl: any;
  browser: any;
  inAppTarget: any;

  isOperationFinished: boolean;

  constructor(
    private orderService: OrderService,
    private generalService: GeneralService,
    private storageService: StorageService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private operationService: OperationService
  ) {
    //this.ngxService.start();
    //this.toastr.success('Hello world!', 'Toastr fun!');
    this.inAppTarget = '_blank';
    this.orange = this.operatorUrl + this.orangeRegular;
    this.mtn = this.operatorUrl + this.mtnRegular;
    this.moov = this.operatorUrl + this.moovRegular;
    this.isOperationFinished = false;
    this.initOrderObject();
    this.initTransactionAmount();
  }

  ngOnInit(): void {

  }

  initTransactionAmount(){
    this.transaction.Amount = this.order.Amount;
    console.log('transaction.Amount ', this.transaction.Amount);
  }

  openBrowser() {}

  findOperator() {}

  checkAmount() {
    let amountRegexp = new RegExp('[0-9]{1,}');
    if (!amountRegexp.test(this.transaction.Amount)) {
      //console.log('Amount not valid !!!');
    } else {
      //console.log('Amount is valid !!!');
    }
  }

  login() {}

  getToken() {}

  async initTransaction() {
    //this.ngxService.start();
    //console.log('this.transaction', this.transaction);
    switch (this.operator) {
      case 'ORANGE':
        this.initOrangeTransaction();
        break;
      case 'MTN':
        this.initMtnTransaction();
        break;
      case 'MOOV':
        break;

      default:
        break;
    }
  }

  async initMtnTransaction() {
    //this.ngxService.start();
    let mtnTransaction = {
      amount: this.transaction.Amount,
      phoneNumber: this.transaction.PhoneNumber,
    };

    (await this.operationService.mtnRequestToPay(mtnTransaction))
      .toPromise()
      .then(async (res) => {
        console.log('INIT MTN TRANSACTION ', res);
        this.ngxService.stop();
        this.mtnOperation = res;
        this.cronTask();
        this.isRefreshEnable = true;
      })
      .catch((err) => {
        this.ngxService.stop();
        console.warn('An error occured', err);
        this.toastr.error('Oops', 'Connexion impossible!!!');
      });
  }

  async initOrangeTransaction() {
    this.ngxService.start();
    let mtnTransaction = {
      amount: this.transaction.Amount,
      phoneNumber: this.transaction.PhoneNumber,
    };

    (await this.operationService.orangeWebPayment(mtnTransaction))
      .toPromise()
      .then(async (res) => {
        this.ngxService.stop();
        this.orangeOperation = res;
        this.redirectUrl = this.orangeOperation.paymentUrl;
        this.openBrowser();
        console.clear();
        console.log('init orange transaction', this.orangeOperation);
        this.isRefreshEnable = true;
        this.cronTask();
      })
      .catch((err) => {
        this.ngxService.stop();
        this.closeBrowser();
        console.warn('An error occured', err);
        this.toastr.error('Oops', 'Connexion impossible!!!');
      });
  }

  orangeRedirectToPaymentPage() {
    console.log('orange Operation', this.orangeOperation);
    //window.open(yourLink, '_self')
  }

  closeBrowser() {
    this.redirectUrl = '';
    this.browser.close();
  }

  chooseService(operator) {
    this.operator = operator;
  }

  checkStatus() {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed`;
        }
      );
  }

  clearOperationVars() {
    this.transaction.Amount = null;
    this.transaction.PhoneNumber = '';

    this.counter = 120;

    this.cronCounter = 30;
    this.operator = '';
    this.isRefreshEnable = false;
    this.cronActivated = false;
    this.pendingToast = false;

    this.orange = this.operatorUrl + this.orangeRegular;
    this.mtn = this.operatorUrl + this.mtnRegular;
    this.moov = this.operatorUrl + this.moovRegular;

    this.orangeOperation = null;
    this.mtnOperation = null;
  }

  closeCronTask() {
    console.log('CRON TASK CLOSE STARTED');
    this.cronActivated = false;
    this.cronIntervalId = null;
    this.cronCounter = 30;
    console.log(
      'CRON TASK Cleared ',
      this.cronIntervalId,
      'this.cronActivated ',
      this.cronActivated
    );
  }

  cronTask() {
    console.log('CRON TASK');
    this.cronActivated = true;

    if (this.cronActivated) {
      this.cronIntervalId = setInterval(() => {
        this.cronCounter = this.cronCounter - 1;
        //console.clear();
        console.log('CRON Timer: ', this.cronCounter);
        if (this.cronCounter === 0) {
          console.log('Timeout');
          this.cronCounter = 30;
          clearInterval(this.cronIntervalId);
          this.isExpired = true;
          this.checkStatus();
        }
      }, 1000);
    } else {
      console.log('CRON ENDED - TRANSACTION FAILED OR SUCCESS !!!');
    }
  }

  redirectToReceiptPage() {
    //this.router.navigate(['/receipt']);
  }

  initOrderObject() {
    this.order = this.storageService.getItem('orderDetails');
    this.order.OrderLines.forEach((element) => {
      element.Amount = this.generalService.convertAmountToStringFormat(
        this.generalService.convertStringToAmount(element.Product.Price) *
          element.Quantity
      );
    });
    this.order.Amount = this.orderService.getOrderTotalAmount(this.order);
    console.log('Order initiated', this.order);
    this.formatOrderDate();
  }

  formatOrderDate() {
    this.orderDate = this.generalService.getformatedDate(this.order.Date);
  }

  printReceipt() {
    console.log('print receipt');
  }
}
