import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    @Output() toggleSidebarEvent = new EventEmitter<void>();
    isSidebarOpen = false;
    
    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.toggleSidebarEvent.emit();
    }
}
