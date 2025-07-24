import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginRequest } from './../../../../core/models/login.model';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  private messageService = inject(MessageService);

  loginForm: FormGroup;
  isLoading = false;

  constructor() {
    this.loginForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;

    const credentials: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log('Error en el login:', error);
          this.showError(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  showError(error: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error, key: 'br', sticky: true });
  }

  // Getters para validaciones en el template
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get isUsernameInvalid(): boolean {
    return !!(this.username?.invalid && this.username?.touched);
  }

  get isPasswordInvalid(): boolean {
    return !!(this.password?.invalid && this.password?.touched);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}