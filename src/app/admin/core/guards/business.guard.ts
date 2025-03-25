import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BusinessStorageService } from '../../../pages/business/business-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessGuard implements CanActivate {
  private businessService = inject(BusinessStorageService);
  private router = inject(Router);

  canActivate(): boolean {
    const hasBusiness = !!this.businessService.getBusiness();

    if (!hasBusiness) {
      this.router.navigate(['/welcome']);
      return false;
    }

    return true;
  }
}
