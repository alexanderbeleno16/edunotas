import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, BreadcrumbComponent, SidebarComponent, FooterComponent],
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
    @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;

    toggleSidebar() {
        this.sidebarComponent.toggle();
    }
}   