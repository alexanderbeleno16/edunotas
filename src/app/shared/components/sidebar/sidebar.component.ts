import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarItem } from './sidebar.types';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;

    toggle() {
        this.sidebar.nativeElement.classList.toggle('hidden');
    }

    menuItems: SidebarItem[] = [
        {
            label: 'Dashboard',
            route: '/dashboard',
            icon: 'M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z'
        },
        {
            label: 'Usuarios',
            route: '/usuarios',
            icon: 'M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
        },
        {
            label: 'Configuración',
            // route: '/configuration',
            icon: 'M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z',
            children: [
                { label: 'General', route: '/configuration/general', icon: '' },
                { label: 'Información del colegio', route: '/configuration/colegio', icon: '' },
                { label: 'Boletines y certificados', route: '/configuration/boletines', icon: '' },
                { label: 'Docentes', route: '/configuration/docentes', icon: '' },
                { label: 'Estudiantes', route: '/configuration/estudiantes', icon: '' }
            ]
        }
    ];

    menuStates: { [key: string]: boolean } = {};

    toggleMenu(label: string) {
        this.menuStates[label] = !this.menuStates[label];
    }

    isMenuOpen(label: string): boolean {
        return this.menuStates[label] ?? false;
    }

    searchTerm = '';

    get filteredMenuItems() {
        if (!this.searchTerm.trim()) {
            return this.menuItems;
        }

        const term = this.searchTerm.toLowerCase();

        return this.menuItems.filter(item =>
            item.label.toLowerCase().includes(term)
            || (item.children?.some(child => child.label.toLowerCase().includes(term)))
        );
    }

    clearSearch() {
        setTimeout(() => {
            this.searchTerm = '';
        }, 150);
    }
}
