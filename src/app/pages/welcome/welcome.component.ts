import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { BaseComponente } from '../../shared/components/BaseComponente/BaseComponente.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  standalone: true,
  imports: [
    MenuComponent
  ]
})
export class WelcomeComponent extends BaseComponente {

  redirect() {
    this.redirectTo('/business/registro');
  }
}
