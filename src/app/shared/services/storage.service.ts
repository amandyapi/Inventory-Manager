import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(dataName, data){
    localStorage.setItem(dataName, JSON.stringify(data));
  }

  getItem(dataName){
    return JSON.parse(localStorage.getItem(dataName));
  }

  clearItem(dataName){
    localStorage.removeItem(dataName);
  }

  clearAll(){
    localStorage.clear();
  }
}
