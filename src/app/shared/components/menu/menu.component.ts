import { Component, inject, OnInit } from '@angular/core';
import { BusinessStorageService } from '../../../pages/business/business-storage.service';
import { MenuItem } from '../../interfaces/menu/menu-item.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class MenuComponent implements OnInit {
  dataStorage: BusinessStorageService = inject(BusinessStorageService);
  hasBusiness: boolean = false;
  isMenuOpen = false;

  menuItems: MenuItem[] = []
  private allMenuItems: MenuItem[] = [
    {
      label: 'EMPRESA',
      subItems: [
        { label: 'Minha empresa', link: '/business/list' },
        { label: 'Benefícios', link: '/business/list' },
        { label: 'Áreas', link: '/business/list' },
        { label: 'Cargos', link: '/business/list' },
        { label: 'Filiais', link: '/business/list' },
      ],
    },
    {
      label: 'VAGAS',
      subItems: [{ label: 'Gestão de vagas', link: '/business/list' }],
    },
    {
      label: 'USUÁRIOS',
      subItems: [
        { label: 'Meu perfil', link: '/business/list' },
        { label: 'Todos os usuários', link: '/business/list' },
      ],
    },
  ];

  constructor() {
    const business = this.dataStorage.getBusiness();
    this.hasBusiness = !!business;
  }

  ngOnInit() {
    this.menuItems = this.hasBusiness
      ? this.allMenuItems
      : [{ label: 'EMPRESA', subItems: [{ label: 'Minha empresa', link: '/business/list' }] }];
  }

}
