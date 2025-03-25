import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from "../../../material-module";
import { BaseComponente } from '../../../shared/components/BaseComponente/BaseComponente.component';
import { BusinessStorageService } from '../business-storage.service';
import { Business } from '../../../shared/interfaces/business/business-edit.interface';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  imports: [MaterialModule],
})
export class BusinessListComponent extends BaseComponente implements OnInit {
  private dataStorage = inject(BusinessStorageService);

  business!: Business | null;

  ngOnInit() {
    this.loadBusiness();
  }

  loadBusiness() {
    this.business = this.dataStorage.getBusiness();
  }

  public redirect(route: string): void {
    this.redirectTo(route);
  }

}
