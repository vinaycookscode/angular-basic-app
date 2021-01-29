import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponseInterface } from '../shared/interfaces/api.response.interface';
import { IUserLogin } from './interfaces/login.interface';
import { IAddUserProduct } from './interfaces/product.interface';
import { IUserInterface } from './interfaces/signup.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  loginToSystem(loginInformation: IUserLogin): Observable<IApiResponseInterface> {
    return this._httpClient?.post<IApiResponseInterface>(environment?.apiUrl + 'api/user/login/', loginInformation);
  }

  signupToSystem(loginInformation: IUserInterface): Observable<IApiResponseInterface> {
    return this._httpClient?.post<IApiResponseInterface>(environment?.apiUrl + 'api/user/signup/', loginInformation);
  }

  getAllUserList(): Observable<IApiResponseInterface> {
    return this._httpClient?.get<IApiResponseInterface>(environment?.apiUrl + 'api/user/');
  }

  deleteUserItem(userId: string): Observable<IApiResponseInterface> {
    return this._httpClient?.delete<IApiResponseInterface>(environment?.apiUrl + 'api/user/' + userId);
  }

  getUserInformationById(userId: string): Observable<IApiResponseInterface> {
    return this._httpClient?.get<IApiResponseInterface>(environment?.apiUrl + 'api/user/' + userId);
  }

  editUser(loginInformation: IUserInterface): Observable<IApiResponseInterface> {
    return this._httpClient?.patch<IApiResponseInterface>(environment?.apiUrl + 'api/user/edit/', loginInformation);
  }

  getAllProducts(): Observable<IApiResponseInterface> {
    return this._httpClient?.get<IApiResponseInterface>(environment?.apiUrl + 'api/products/');
  }

  purchaseProduct(userProductList: IAddUserProduct): Observable<IApiResponseInterface> {
    return this._httpClient?.post<IApiResponseInterface>(environment?.apiUrl + 'api/user/products/', userProductList);
  }

  getUserProductList(userId: string): Observable<IApiResponseInterface> {
    return this._httpClient?.get<IApiResponseInterface>(environment?.apiUrl + 'api/user/products/' + userId);
  }
}
