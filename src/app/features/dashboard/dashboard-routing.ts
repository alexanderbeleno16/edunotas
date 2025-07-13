import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        // data: { breadcrumb: 'Dashboard' },
        children: [
            {
                path: 'home',
                data: { breadcrumb: 'Inicio' },
                loadComponent: () =>
                    import('./pages/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            // admin-dashboard
            // teacher-dashboard
            // student-dashboard
            // parent-dashboard
        ]
    }
];
