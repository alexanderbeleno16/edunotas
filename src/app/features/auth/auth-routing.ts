import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: 'auth',
        loadComponent: () =>
            import('../../layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'forgot-password',
                loadComponent: () =>
                    import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];