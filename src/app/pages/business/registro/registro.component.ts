import { Component, OnInit, inject } from '@angular/core';
import { BaseComponente } from '../../../shared/components/BaseComponente/BaseComponente.component';
import { Business } from '../../../shared/interfaces/business/business-edit.interface';
import { MaterialModule } from '../../../material-module';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BusinessAPI } from '../../../shared/interfaces/business/business-get.interface';
import { debounceTime } from 'rxjs';
import { ZipCode } from '../../../shared/interfaces/zipCode/zip-code.interface';
import { BusinessFormService } from '../business-form.service';
import { BusinessDataService } from '../business-data.service';
import { BusinessStorageService } from '../business-storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [
    MaterialModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()]
})
export class RegistroComponent extends BaseComponente implements OnInit {
  loading: boolean = false;
  business: Business | null = null;
  hasEditing: boolean = false;

  private formService = inject(BusinessFormService);
  private dataService = inject(BusinessDataService);
  private dataStorage = inject(BusinessStorageService);
  
  ngOnInit() {
    this.initializeForm();
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      this.openSnackBar('Verifique os campos', 'Fechar');
      this.validateFirstInvalidField()
      return;
    }

    const saved_business = this.dataStorage.saveBusiness(this.form.value);
    if (!saved_business) {
      const action = this.hasEditing ? 'atualizar' : 'salvar';
      this.openSnackBar(`Erro ao ${action} os dados`, 'Fechar');
      return;
    }

    this.redirect('business/list');
    const action = this.hasEditing ? 'atualizados' : 'salvos';
    this.openSnackBar(`Dados ${action} com sucesso`, 'Fechar');
  }

  public redirect(route: string, back_route: boolean = false): void {
    this.redirectTo(route, back_route);
  }

  private initializeForm(): void {
    this.form = this.formService.createForm();

    this.setupListeners();
    this.loadBusiness()
  }

  private loadBusiness() {
    let business = this.dataStorage.getBusiness();
    if (!business) return;

    this.hasEditing = !this.hasEditing;
    this.form.patchValue(business, { emitEvent: false });
  }

  private setupListeners(): void {
    this.form.get('company_document')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        let is_valid = ValidatorsService.validateCNPJ(this.form.get('company_document') as any);

        if (is_valid == null) {
          this.fetchCompanyData(value);
        }
      });

    this.form.get('zip_code')?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        let is_valid = ValidatorsService.validateZipCode(this.form.get('zip_code') as any);

        if (is_valid == null) {
          this.fetchZipCodeData(value);
        }
      });
  }

  private fetchCompanyData(cnpj: string): void {
    this.loading = true;
    this.dataService.getCompanyData(cnpj).subscribe({
      next: (data: BusinessAPI) => {
        this.form.patchValue({
          company_name: data.razao_social,
          zip_code: data.cep,
          address: data.logradouro,
          neighborhood: data.bairro,
          state: data.uf,
          owner_phone: data.ddd_telefone_1,
          email: data.email,
          city: data.municipio,
          complement: data.complemento,
          owner_name: data?.qsa[0]?.nome_socio,
        }, { emitEvent: false });
      },
      complete: () => {
        this.loading = false;
      }
    }
    );
  }

  private fetchZipCodeData(zip_code: string): void {
    this.loading = true;
    this.dataService.getZipCodeData(zip_code).subscribe({
      next: (data: ZipCode) => {
        this.form.patchValue({
          zip_code: data.cep,
          address: data.street,
          neighborhood: data.neighborhood,
          state: data.state,
          city: data.city
        }, { emitEvent: false });
      },
      complete: () => {
        this.loading = false;
      }
    }
    );
  }
}
