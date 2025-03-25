import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../shared/interfaces/user/user-login.interface';
import { MaterialModule } from '../../../material-module';
import { BaseComponente } from '../../../shared/components/BaseComponente/BaseComponente.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MaterialModule
  ]
})
export class LoginComponent extends BaseComponente implements OnInit {
  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit(): void {
    const { email, password }: UserLogin = this.form.value;

    if (!this.form.valid) {
      this.openSnackBar('Verifique os campos', 'Fechar');
      this.validateFirstInvalidField()
      return;
    }

    const user: UserLogin = {
      email,
      password,
    };

    this.auth.sign(user).subscribe({
      next: () => {
        this.router.navigate(['/welcome']);
        this.openSnackBar('Login realizado com sucesso', 'Fechar');
      },
      error: () => {
        this.openSnackBar('Erro ao fazer login', 'Fechar');
      },
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
