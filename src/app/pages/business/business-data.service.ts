import { Injectable } from '@angular/core';
import { BusinessService } from './business.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusinessDataService {
  constructor(private businessService: BusinessService) {}

  getCompanyData(cnpj: string): Observable<any> {
    return this.businessService.getCompanyData(cnpj);
  }

  getZipCodeData(zip_code: string): Observable<any> {
    return this.businessService.getZipCodeData(zip_code);
  }
}
