import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../config/interfaces/config.interface';
@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: [ './confirm.component.scss' ]
})
export class ConfirmComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<ConfirmComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialog
	) {}

	ngOnInit() {}
	onNoClick(): void {
		this.dialogRef.close(false);
  }
  onYesClick(){
    this.dialogRef.close(true);
  }
}
