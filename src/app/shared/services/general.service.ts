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

  getFullDate(){
    let dateObj = new Date();
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
    let h = dateObj.getUTCHours();
    let m = dateObj.getUTCMinutes();
    let invertedFormatedDate = year + "-" + month + "-" + day + " " + h + ":" + m;
    //console.log("formated date", invertedFormatedDate);
    return invertedFormatedDate;
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

  generateId(){
    let dateObj = new Date();
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
    let h = dateObj.getUTCHours();
    let m = dateObj.getUTCMinutes();
    let s = dateObj.getUTCSeconds();
    let invertedFormatedDate = year + "" + month + "" + day + "" + h + "" + m + "" + s;
    //console.log("formated date", invertedFormatedDate);
    return invertedFormatedDate;
  }

  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  checkIdAsDateFormat(id) {
    let idRegexp = new RegExp('^[0-9]{10,15}$');
    let todayDate: any = id;
    let result = false;

    if(idRegexp.test(todayDate)){
        result = true;
        console.log('its a date')
    }
    else
    {
        result = false;
        console.log('its not a date')
    }
    return result;
  }

}
