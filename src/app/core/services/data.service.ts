import { Injectable, Input } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tagData = new BehaviorSubject<any>([]);
  constructor() { }
  @Input()
  set tag(value){
    this.tagData.next(value);
  }
  get tag(){
    return this.tagData.getValue();
  }


}
