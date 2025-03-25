import { Directive, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

type ControllType = AbstractControl<any, any> | null

@Directive()
export abstract class BaseComponente {
  public form!: FormGroup;
  public fb: FormBuilder = inject(FormBuilder);
  public router: Router = inject(Router);
  public auth: AuthService = inject(AuthService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  public redirectTo(route: string, back_route: boolean = false): void {
    if (back_route) {
      window.history.back();
      return;
    }

    this.router.navigate([route]);
  }

  public isErrorRequired(controll_name: string) {
    return this.getControll(controll_name)?.errors?.['required']
  }

  public getStatusControll(controll_name: string) {
    return this.getControll(controll_name)?.invalid && this.getControll(controll_name)?.touched
  }

  public validateFirstInvalidField() {
    const form = this.form;
    for (const field of Object.keys(form.controls)) {
      const control = form.get(field);

      if (control && control.invalid) {
        control.markAsTouched();
        control.updateValueAndValidity();
        break;
      }
    }
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  private getControll(control: string): ControllType {
    return this.form.get(control);
  }
}
