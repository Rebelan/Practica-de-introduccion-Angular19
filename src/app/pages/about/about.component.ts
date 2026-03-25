import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AboutApiService, User } from '../../services/about-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private aboutApiService = inject(AboutApiService);
  private router = inject(Router);

  users: User[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.aboutApiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los usuarios';
        this.loading = false;
      }
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/about', id]);
  }
}