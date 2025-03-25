import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessAPI } from '../../shared/interfaces/business/business-get.interface';
import { ZipCode } from '../../shared/interfaces/zipCode/zip-code.interface';
import { Business } from '../../shared/interfaces/business/business-edit.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  http: HttpClient = inject(HttpClient);

  base_url: string = 'https://brasilapi.com.br/api/';

  getCompanyData(cnpj: string): Observable<BusinessAPI> {
    return this.http.get<BusinessAPI>(`${this.base_url}cnpj/v1/${cnpj}`);
  }

  getZipCodeData(zip_code: string): Observable<ZipCode> {
    return this.http.get<ZipCode>(`${this.base_url}cep/v2/${zip_code}`);
  }

  saveBusiness(business: Business): boolean {
    let response = false;
    try {
      localStorage.setItem('business', JSON.stringify(business));
      response = true;
    } catch (error) {
      response = false;
    }

    return response;
  }

  getBusiness(): Business | null {
    let key = localStorage.getItem('business') || null;
    if (!key) return null;

    let data: Business = JSON.parse(key)
    return data;
  }
}
