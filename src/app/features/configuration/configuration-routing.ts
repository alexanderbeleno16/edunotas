import { Routes } from '@angular/router';

export const configurationRoutes: Routes = [
    {
        path: 'configuration',
        data: { breadcrumb: 'Configuración' },
        children: [
            {
                path: 'general',
                data: { breadcrumb: 'General' },
                loadComponent: () =>
                    import('./pages/general/general.component').then(m => m.GeneralComponent)
            },
            {
                path: '',
                redirectTo: 'general',
                pathMatch: 'full'
            }
        ]
    }
];
