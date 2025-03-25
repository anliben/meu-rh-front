import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  static validateCNPJ(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value?.replace(/\D/g, '');

    if (!cnpj || cnpj.length !== 14) {
      return { invalidCnpj: true };
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return { invalidCnpj: true };

    tamanho++;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return { invalidCnpj: true };

    return null;
  }

  static validateCPF(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value?.replace(/\D/g, '');

    if (!cpf || cpf.length !== 11) {
      return { invalidCpf: true };
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      return { invalidCpf: true };
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return { invalidCpf: true };

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return { invalidCpf: true };

    return null;
  }

  static validateZipCode(control: AbstractControl): ValidationErrors | null {
    const zip_code = control.value?.replace(/\D/g, '');

    if (!zip_code || zip_code.length !== 8) {
      return { invalidCEP: true };
    }

    if (/^\d{2}\.\d{3}-\d{3}$/.test(zip_code)) {
      return { invalidCEP: true };
    }

    return null;
  }

  static validatePhone(control: AbstractControl): ValidationErrors | null {
    const phone = control.value?.replace(/\D/g, '');

    if (!phone || phone.length !== 11) {
      return { invalidCelular: true };
    }

    if (/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
      return { invalidCelular: true };
    }

    return null;
  }
}