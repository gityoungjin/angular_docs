import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  // 원본 데이터
  private data = new BehaviorSubject<any>(null);

  // 몰?루 시발
  currentData = this.data.asObservable();

  constructor() { }

  // 원본 데이터에 새로운 데이터를 추가한다.
  transferData(data:any){
    this.data.next(data);
  }
  
}
