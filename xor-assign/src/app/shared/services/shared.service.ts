import { IUserInterface } from './../../user/interfaces/signup.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public uploadedFile = new BehaviorSubject<File[]>([]);
  public userInformation = new BehaviorSubject<IUserInterface>(null);
  public autorizationToken = new BehaviorSubject<string>(null);
  constructor() { }
}
