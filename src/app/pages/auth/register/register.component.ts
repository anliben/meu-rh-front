import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { Validators } from '@angular/forms';
import { BaseComponente } from '../../../shared/components/BaseComponente/BaseComponente.component';
import { UserRegister } from '../../../shared/interfaces/user/user-register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MaterialModule
  ],
})
export class RegisterComponent extends BaseComponente implements OnInit {
  ngOnInit(): void {
    this.initializeForm();
  }

  public onSubmit(): void {
    const { name, email, password, re_password, confirmation } = this.form.value;
    this.validateFirstInvalidField()
    if (password !== re_password) {
      this.openSnackBar('As senhas não coincidem', 'Fechar');
      return;
    }

    if (!confirmation) {
      this.openSnackBar('Aceite os Termos de Uso e Privacidade', 'Fechar');
      return;
    }

    if (!this.form.valid) {
      this.openSnackBar('Verifique os campos', 'Fechar');
      return;
    }

    const user: UserRegister = {
      name,
      email,
      password,
    };

    this.auth.signUp(user).subscribe({
      next: () => {
        this.openSnackBar('Cadastro realizado com sucesso', 'Fechar');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.openSnackBar('Erro ao cadastrar', 'Fechar');
      },
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      re_password: ['', [Validators.required, Validators.minLength(3)]],
      confirmation: [false, [Validators.required, Validators.requiredTrue]],
    });
  }
}
