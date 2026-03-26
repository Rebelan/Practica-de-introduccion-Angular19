import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';

  onSubmit(): void {
    this.error = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (isValid) => {
        if (isValid){
          this.router.navigate(['/admin']);
        }else{
          this.error = 'Email o contraseña incorrectos';
        }
      },
      error: () =>{
        this.error = 'Error al conectar con el servidor';
      }
    })
  }
}
