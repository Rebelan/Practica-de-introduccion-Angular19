import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AboutApiService, User } from '../../services/about-api.service';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { Subscription } from 'rxjs';
import { SseService } from '../../services/sse.service';

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

  mensajes: any[] = []
  estado = 'Conectando...'
  private sub?: Subscription;

  constructor(private sse: SseService){}

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

    this.sub = this.sse.connect('http://localhost:3001/events').subscribe({
      next: (msg) => {
        this.estado = 'Conectado!'
        this.mensajes.unshift(msg);
      },
      error: (err) => {
        console.error(err);
        this.estado = 'Error!'
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




  //gsap a partir de aqui
  private tl = gsap.timeline();

  ngAfterViewInit(): void {
    //stagger
    gsap.from('.about-item', {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1
    });
    //labels
    this.tl
    .addLabel('start')
    .from('.about-title', {y: -30, opacity: 0, duration: 1})
    .addLabel('middle')
    .from('.about-text', {opacity: 0, duration: 1}, 'start+=0.5')
    .addLabel('end')
    .from('.about-button', {scale: 0, duration: 0.5}, 'middle+=0.3');

    //callbacks
    gsap.to('.about-alert', {
      x: 100,
      duration: 1,
      onStart: () => console.log('Animacion iniciada'),
      onComplete: () => console.log('Animacion completada')
    });
  }

  ngOnDestroy(): void {
    this.tl.kill();
    this.sub?.unsubscribe();
    this.estado = 'Desconectado!';
  }

}