import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnakBarService {
  private duration = 1000;
  constructor(private _matSnackBar: MatSnackBar) {}
  success(message?: string, action: string = 'End now', horizontalPosition: MatSnackBarHorizontalPosition = 'start',
          verticalPosition: MatSnackBarVerticalPosition = 'bottom'): void {
    this._matSnackBar?.open(message, action, {
      duration: this.duration,
      horizontalPosition,
      verticalPosition,
      panelClass: ['success-snak-bar']
    });
  }
  warning(message?: string, action: string = 'End now', horizontalPosition: MatSnackBarHorizontalPosition = 'start',
          verticalPosition: MatSnackBarVerticalPosition = 'bottom'): void {
    this._matSnackBar?.open(message, action, {
      duration: this.duration,
      horizontalPosition,
      verticalPosition,
      panelClass: ['warning-snak-bar']
    });
  }
  error(message?: string, action: string = 'End now', horizontalPosition: MatSnackBarHorizontalPosition = 'start',
        verticalPosition: MatSnackBarVerticalPosition = 'bottom'): void {
    this._matSnackBar?.open(message, action, {
      duration: this.duration,
      horizontalPosition,
      verticalPosition,
      panelClass: ['failure-snak-bar']
    });
  }
}
