import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "about", loadComponent: () => import('./pages/about/about.component').then(a => a.AboutComponent,),},
    {path: "contact", loadComponent: () => import('./pages/contact/contact.component').then(c => c.ContactComponent,),}
];
