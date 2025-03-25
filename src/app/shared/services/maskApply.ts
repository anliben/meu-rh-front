import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ApplyMaskService {
  apply(value: string, type: 'cpf' | 'cnpj' | 'phone' | 'zip_code'): string {
    if (!value) return '';

    let cleanedValue = value.replace(/\D/g, ''); // Remove tudo que não for número

    switch (type) {
      case 'cpf':
        return cleanedValue
          .slice(0, 11)
          .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

      case 'cnpj':
        return cleanedValue
          .slice(0, 14)
          .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

      case 'phone':
        return cleanedValue.length <= 10
          ? cleanedValue
            .slice(0, 10)
            .replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
          : cleanedValue
            .slice(0, 11)
            .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

      case 'zip_code':
        return cleanedValue
          .slice(0, 8)
          .replace(/^(\d{5})(\d{3})$/, '$1-$2');

      default:
        return value;
    }
  }

}
