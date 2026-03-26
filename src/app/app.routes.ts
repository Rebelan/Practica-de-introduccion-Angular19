import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "about", loadComponent: () => import('./pages/about/about.component').then(a => a.AboutComponent,),},
    {path: "contact", loadComponent: () => import('./pages/contact/contact.component').then(c => c.ContactComponent,),},
    {path: "about/:id", loadComponent: () => import('./pages/user-detail/user-detail.component').then(u => u.UserDetailComponent,),},
    {path: "login", loadComponent: () => import('./pages/login/login.component').then(l => l.LoginComponent,),},
    {path: "admin", loadComponent: () => import('./pages/admin/admin.component').then(a => a.AdminComponent,), canActivate: [authGuard]},
    {path: "pipes-demo", loadComponent: () => import('./pages/pipes-demo/pipes-demo.component').then(p => p.PipesDemoComponent,),},
];
