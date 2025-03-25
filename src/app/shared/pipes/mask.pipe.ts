import { inject, Pipe, PipeTransform } from '@angular/core';
import { ApplyMaskService } from '../services/maskApply';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {
  applyMask: ApplyMaskService = inject(ApplyMaskService);

  transform(value: string, type: 'cpf' | 'cnpj' | 'phone' | 'zip_code'): string {
    return this.applyMask.apply(value, type);
  }
}
