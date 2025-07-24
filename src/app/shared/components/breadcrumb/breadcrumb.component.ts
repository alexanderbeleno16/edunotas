import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbService } from '../../../core/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  constructor(private breadcrumbService: BreadcrumbService) {}

  get breadcrumbs$() {
    return this.breadcrumbService.breadcrumbs$;
  }
}
