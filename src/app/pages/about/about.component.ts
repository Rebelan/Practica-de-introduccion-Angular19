import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
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

  users = signal<User[]>([])
  loading = signal(true);
  error = signal('');

  // filters
  nameFilter = signal('');
  cityFilter = signal('');

  ngOnInit(): void {
    this.aboutApiService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data)
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los usuarios');
        this.loading.set(false);
      }
    });
  }

  cities = computed(() => {
    const uniqueCities = this.users().map(user => user.address.city);
    return [...new Set(uniqueCities)].sort();
  });

  filteredUsers = computed(() => {
    const name = this.nameFilter().trim().toLowerCase();
    const city = this.cityFilter();

    return this.users().filter(user => {
      const matchesName =
        !name || user.name.toLowerCase().includes(name) ||
        user.username.toLowerCase().includes(name);
      
      const matchesCity =
        !city || user.address.city === city;
      return matchesName && matchesCity;
    });
  });


  resetFilters(): void {
    this.nameFilter.set('');
    this.cityFilter.set('');
  }


  goToDetail(id: number): void {
    this.router.navigate(['/about', id]);
  }
}