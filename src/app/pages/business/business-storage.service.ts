import { Injectable } from '@angular/core';
import { BusinessService } from './business.service';
import { Business } from '../../shared/interfaces/business/business-edit.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessStorageService {
  constructor(private businessService: BusinessService) {}

  saveBusiness(business: Business): boolean {
    return this.businessService.saveBusiness(business);
  }

  getBusiness(): Business | null {
    return this.businessService.getBusiness();
  }
}
