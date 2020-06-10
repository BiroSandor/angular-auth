import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  notify(
    mainText: string, 
    duration: number,
    horizontalPosition: MatSnackBarHorizontalPosition = 'end', 
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    this._snackBar.open(mainText, '', {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}
