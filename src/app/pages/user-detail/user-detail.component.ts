import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AboutApiService, User } from '../../services/about-api.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private aboutApiService = inject(AboutApiService);

  user ?: User;
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if(!id){
      this.error = "ID de usuario no válido"
      this.loading = false;
      return
    }

    this.aboutApiService.getUserId(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: () =>{
        this.error = 'No se pudo cargar la información del usuario'
        this.loading = false;
      }
    });
  }
}
