import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient,
  ) { }

  convertStringToAmount(v){
    const regex = / /g;
    const result = v.replaceAll(regex, '');
    console.log('result', result);
    return result;
  }
  convertAmountToStringFormat(amount){
    let a: any = amount as any;
    let amountStr: any;
    amountStr = parseInt(a).toLocaleString('fr-FR');
    return amountStr;
  }

  getFormattedDate(_date) {
    let d, m, y, today: any = '';
    today = new Date();
    d = _date.getDate();//getUTCDate
    m = _date.getMonth() + 1;
    y = _date.getFullYear();

    let formattedDate: any = {
      day: d,
      month: m,
      year: y
    }
    return formattedDate
  }

  getInvertedFormatedDate(myDate) {
    let dateObj = new Date(myDate);
    let day = dateObj.getDate();
    let _day: string;
    if(day < 10) {
      _day = "0" + day;
    }
    let month = dateObj.getMonth()+1;
    let _month: string;
    if(month < 10) {
      _month = "0" + month;
    }
    let year = dateObj.getFullYear();
    let invertedFormatedDate = year + "-" + month + "-" + day;
    //console.log("formated date", invertedFormatedDate);
    return invertedFormatedDate;
  }

  getformatedDate(myDate) {
    //Effective date
    let dateObj = new Date(myDate);
    let day = dateObj.getDate();
    let _day: string;
    if(day < 10) {
      _day = "0" + day;
    }
    let month = dateObj.getMonth()+1;
    let _month: string;
    if(month < 10) {
      _month = "0" + month;
    }
    let year = dateObj.getFullYear();
    let formatedDate = day + "-" + month + "-" + year;
    //console.log("formated date", formatedDate);
    return formatedDate;
  }

  getEnformatedDate(dateObj: Date) {
    //console.log('dateObj', dateObj);
    let formatedDate;
    let year = dateObj.getFullYear();
    formatedDate = year;

    let month = dateObj.getMonth()+1;
    let _month: string;
    if(month < 10) {
      _month = "0" + month;
      formatedDate += "-" + _month
    }
    else
    {
      formatedDate += "-" + month
    }

    let day = dateObj.getDate();
    let _day: string;
    if(day < 10) {
      _day = "0" + day;
      formatedDate += "-" + _day
    }
    else
    {
      formatedDate += "-" + day
    }

    //console.log("formated date", formatedDate);
    return formatedDate;
  }

}
