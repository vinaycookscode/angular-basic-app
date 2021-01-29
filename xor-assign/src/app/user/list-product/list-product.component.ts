import { SharedService } from './../../shared/services/shared.service';
import { SnakBarService } from 'src/app/shared/services/snak.bar.service';
import { IAddUserProduct, IProductInformation } from '../interfaces/product.interface';
import { IApiResponseInterface } from 'src/app/shared/interfaces/api.response.interface';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  productList: [IProductInformation];
  userId: string = null;
  constructor(
    private _userService: UserService,
    private _snackBarService: SnakBarService,
    private _router: Router,
    private _sharedService: SharedService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute?.params?.subscribe( (routeParameter) => {
      this.userId = routeParameter?.id;
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this._userService?.getUserProductList(this.userId).subscribe( (productResponse: IApiResponseInterface) => {
        if (productResponse?.status) {
          this.productList = productResponse?.data;
        } else {
          this.productList = null;
        }
      }, error => {
          this._snackBarService.error(error?.error?.errors);
          this._router.navigate(['/']);
      });
    } else {
      this._userService?.getAllProducts().subscribe( (productResponse: IApiResponseInterface) => {
        if (productResponse?.status) {
          this.productList = productResponse?.data;
        } else {
          this.productList = null;
        }
      }, error => {
          this._snackBarService.error(error?.error?.errors);
          this._router.navigate(['/']);
      });
    }
  }

  purchaseThisProduct(productInfo: IProductInformation): void {
    if (!this.userId) {
      const apiInput: IAddUserProduct = {
        id: this._sharedService?.userInformation?.value?._id,
        productId: [productInfo?._id]
      };

      this._userService.purchaseProduct(apiInput).subscribe( (apiResponse: IApiResponseInterface) => {
        if (apiResponse?.status) {
          this._snackBarService.success(productInfo?.name + ', has purchased successfully');
        } else {
          this._snackBarService.error('Something went wrong');
        }
      }, error => {
        this._snackBarService.error(error?.error?.errors);
      });
    }
  }

}
