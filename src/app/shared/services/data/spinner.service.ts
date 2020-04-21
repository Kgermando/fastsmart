import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { snackbar } from '../../models/config.interface';
import { SnackbarComponent } from '../../component/snackbar/snackbar.component';
 

@Injectable({
	providedIn: 'root'
})
export class SpinnerService {
	
	constructor(private snackbar: MatSnackBar, 
				public dialog: MatDialog, 
				private spinner: NgxSpinnerService
				) {}

	openSnackBar(configuration: snackbar) {
		this.snackbar.openFromComponent(SnackbarComponent, {
			duration: (configuration.duration ? configuration.duration : 1) * 1000,
			data: configuration.data,
			horizontalPosition: configuration.horizontalPosition ? configuration.horizontalPosition : 'right',
			verticalPosition: configuration.verticalPosition ? configuration.verticalPosition : 'top',
			panelClass: configuration.panelClass ? configuration.panelClass : null
		});
  }
  
  showSpinner(){
    this.spinner.show();
  }
  hideSpinner(){
    this.spinner.hide();
  }
}
