import { SharedService } from './services/shared.service';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
      private _sharedService: SharedService
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (this._sharedService?.autorizationToken.value) {
        req = req.clone({ headers: req.headers.set('Authorization', this._sharedService?.autorizationToken?.value) });
      }
      return next.handle(req);
    }
}
