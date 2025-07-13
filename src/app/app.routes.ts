import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth-routing';
import { dashboardRoutes } from './features/dashboard/dashboard-routing';
import { configurationRoutes } from './features/configuration/configuration-routing';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            ...dashboardRoutes,
            ...configurationRoutes,
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    ...authRoutes,
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
