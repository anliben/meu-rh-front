import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material-module';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css'],
  standalone: true,
  imports: [
    MaterialModule
  ]
})
export class ModalAlertComponent {
  dialogRef: MatDialogRef<ModalAlertComponent> = inject(MatDialogRef<ModalAlertComponent>)
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
}