import { OperationService } from './../../shared/services/operation.service';
import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../shared/services/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from './../../shared/services/general.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SecurityService } from 'src/app/shared/services/security.service';
@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss'],
})
export class OrdersDetailsComponent implements OnInit {
  order: any;
  closeResult = '';
  orderDate: any;

  operatorUrl = 'assets/common/img/operateurs/';

  orange = '';
  mtn = '';
  moov = '';

  orangeRegular = 'OrangeMoney.png';
  mtnRegular = 'mtn-ci.png';
  moovRegular = 'moov-money.png';

  orangewhite = 'OrangeMoney-white.png';
  mtnwhite = 'mtn-ci-white.png';
  moovwhite = 'moovmoney-white.png';

  operator: any = '';

  public transaction: any = {
    phoneNumber: '',
    order: {
      orderLines: [],
    },
  };

  isTransactionEnable = false;
  isTransactionFinished = false;

  delay: number; //900
  duration: number;
  currentDate: any = '';

  isExpired: boolean;
  isAmountValid = true;
  isPhoneNumberValid = true;

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

  isCurrentOrder: boolean = false;

  constructor(
    private orderService: OrderService,
    private generalService: GeneralService,
    private storageService: StorageService,
    private securityService: SecurityService,
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

    this.isCurrentOrder = this.generalService.checkIdAsDateFormat(
      this.order.id
    );
  }

  ngOnInit(): void {}

  openBrowser(url) {
    console.log('browser !!!');
    window.open(url, '_blank');
    console.log('browser opened !!!');
  }

  findOperator() {
    if (
      this.transaction.phoneNumber !== '' &&
      this.transaction.phoneNumber !== null &&
      this.transaction.phoneNumber.length === 10
    ) {
      let phone = this.transaction.phoneNumber as string;
      let prefix = phone.substr(0, 2);
      let choice = '';
      //console.log('this.transaction.PhoneNumber', prefix);
      switch (prefix) {
        case '05':
          console.log('MTN');
          choice = 'MTN';
          this.orange = this.operatorUrl + this.orangewhite;
          this.mtn = this.operatorUrl + this.mtnRegular;
          this.moov = this.operatorUrl + this.moovwhite;
          break;
        case '01':
          console.log('MOOV');
          choice = 'MOOV';
          this.orange = this.operatorUrl + this.orangewhite;
          this.mtn = this.operatorUrl + this.mtnwhite;
          this.moov = this.operatorUrl + this.moovRegular;
          break;
        case '07':
          console.log('ORANGE');
          choice = 'ORANGE';
          this.orange = this.operatorUrl + this.orangeRegular;
          this.mtn = this.operatorUrl + this.mtnwhite;
          this.moov = this.operatorUrl + this.moovwhite;
          break;
        case '77':
          console.log('ORANGE');
          choice = 'ORANGE';
          this.orange = this.operatorUrl + this.orangeRegular;
          this.mtn = this.operatorUrl + this.mtnwhite;
          this.moov = this.operatorUrl + this.moovwhite;
          break;
        default:
          break;
      }
      this.operator = choice;
    }
  }

  async initTransaction() {
    this.ngxService.start();
    console.log('this.transaction', this.transaction, this.order);
    //return false;
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
    (await this.operationService.mtnRequestToPay(this.transaction))
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
    (await this.operationService.orangeWebPayment(this.transaction))
      .toPromise()
      .then(async (res) => {
        this.ngxService.stop();
        this.orangeOperation = res;
        this.redirectUrl = this.orangeOperation.paymentUrl;
        this.openBrowser(this.redirectUrl);
        //console.clear();
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

  closeBrowser() {
    this.redirectUrl = '';
    this.browser.close();
  }

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
    this.transaction.amount = null;
    this.transaction.phoneNumber = '';

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

  initOrderObject() {
    this.order = this.storageService.getItem('orderDetails');
    console.log('Order initiated', this.order);
    this.order.orderLines.forEach((elt) => {
      this.transaction.order.orderLines.push({
        productId: elt.product.id,
        quantity: elt.quantity,
      });
    });
    console.log('Transaction initiated', this.transaction);
    //this.order.product.image = 'data:image/png;base64,'+this.order.product.image;
    //console.log('Order initiated', this.order);
    this.formatOrderDate();
  }

  formatOrderDate() {
    this.orderDate = this.generalService.getformatedDate(
      this.order.effectiveDate
    );
  }

  printReceipt() {
    console.log('print receipt');
  }

  setOperatorState(){
    let state = {
      Operator: '',
      Id: '',
    };

    if (this.operator === 'ORANGE') {
      state.Operator = 'orange';
      state.Id = this.orangeOperation.orderId;
    } else if (this.operator === 'MTN') {
      state.Operator = 'mtn';
      state.Id = this.mtnOperation.externalId;
    }
    return state;
  }

  async checkStatus() {
    this.ngxService.start();
    console.log('Check Transaction Status');
    let state = this.setOperatorState();
    
    (await this.operationService.getState(state.Operator, state.Id))
      .toPromise()
      .then(async (res) => {
        this.ngxService.stop();
        console.clear();
        console.log('TRANSACTION STATUS ', res);
        switch (this.operator) {
          case 'ORANGE':
            this.checkOrangeStatus(res);
            break;
          case 'MTN':
            this.checkMtnStatus(res);
            break;
          default:
            console.log('Default check status');
            break;
        }
      })
      .catch((err) => {
        this.ngxService.stop();
        console.warn('An error occured', err);
        this.toastr.error('Echec de la transaction', 'Transaction impossible');
      });
  }

  checkOrangeStatus(res) {
    this.orangeOperation = res;
    let data;
    switch (this.orangeOperation.status) {
      case 0: //INITIATED
        if (!this.pendingToast) {
          this.toastr.info('Info', 'Transaction initialisée');
          this.pendingToast = true;
        }
        this.cronTask();
        break;
      case 1: //PENDING
        if (!this.pendingToast) {
          this.toastr.info('Info', 'Transaction en attente');
        }
        this.cronTask();
        break;
      case 2: //EXPIRED
        data = {
          key: 'expired',
          message: 'session timeout',
        };
        this.operationService.setExternalOperation(data);
        this.closeBrowser();
        this.toastr.warning(
          'Echec de la transaction',
          'Expiration du délais...'
        );
        this.clearOperationVars();
        this.closeCronTask();
        break;
      case 3: //SUCCESS
        data = {
          key: 'success',
          message: 'Operation success',
        };
        this.operationService.setExternalOperation(data);
        this.closeBrowser();
        this.toastr.success('Success', 'Opération réussie...');
        this.clearOperationVars();
        this.closeCronTask();
        break;
      case 4: //FAILED
        data = {
          key: 'failed',
          message: 'Operation failed',
        };
        this.operationService.setExternalOperation(data);
        this.closeBrowser();
        this.toastr.warning(
          'Echec de la transaction',
          'Une erreur est survenue...'
        );
        this.clearOperationVars();
        this.closeCronTask();
        break;

      default:
        break;
    }
  }

  checkMtnStatus(res) {
    this.mtnOperation = res;
    switch (this.mtnOperation.status) {
      case 0:
        if (!this.pendingToast) {
          this.toastr.info('Info', 'Transaction en attente');
          this.pendingToast = true;
        }
        this.cronTask();
        break;
      case 1:
        this.toastr.success('Success', 'Opération réussie...');
        this.clearOperationVars();
        this.closeCronTask();
        break;
      case 2:
        this.toastr.error(
          this.reasons[this.mtnOperation.reason],
          'Une erreur est survenue...'
        );
        this.clearOperationVars();
        this.closeCronTask();
        break;

      default:
        break;
    }
  }
}
