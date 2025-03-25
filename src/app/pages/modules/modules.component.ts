import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
  standalone: true,
  imports: [ RouterOutlet ],
})
export class ModulesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
