import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../shared/services/validators.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessFormService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      type: [''],
      company_name: ['', [Validators.required, Validators.minLength(3)]],
      company_document: ['', [Validators.required, ValidatorsService.validateCNPJ]],
      zip_code: ['', [Validators.required, ValidatorsService.validateZipCode]],
      address: [''],
      neighborhood: [''],
      state: [''],
      city: [''],
      complement: [''],
      owner_phone: ['', [Validators.required, ValidatorsService.validatePhone]],
      owner_name: ['', [Validators.required]],
      owner_document: ['', [Validators.required, ValidatorsService.validateCPF]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
