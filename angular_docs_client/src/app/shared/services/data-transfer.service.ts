import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private data = new BehaviorSubject<any>(null);
  currentData = this.data.asObservable();

  constructor() { }

  transferData(data:any){
    this.data.next(data);
  }
  
}
