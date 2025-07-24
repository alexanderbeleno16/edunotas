import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb.types';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {

    private readonly _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
    breadcrumbs$ = this._breadcrumbs.asObservable();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
            this._breadcrumbs.next(breadcrumbs);
        });
    }

    private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            // Si no hay breadcrumb definido en data, usar el path capitalizado
            const label = child.snapshot.data['breadcrumb']
                ?? this.formatLabelFromPath(routeURL);

            if (label) {
                breadcrumbs.push({ label, url });
            }

            return this.createBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }

    // Capitaliza y convierte guiones en espacios
    private formatLabelFromPath(path: string): string {
        if (!path) return '';
        return path.split('/').pop()! // obtener último segmento
            .replace(/-/g, ' ')         // guiones a espacio
            .replace(/\b\w/g, l => l.toUpperCase()); // capitalizar palabras
    }

    private createBreadcrumbs2(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        const children = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            // Evita agregar si no hay data o breadcrumb
            if (child.snapshot.data['breadcrumb']) {
                breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url });
            }

            return this.createBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }
}