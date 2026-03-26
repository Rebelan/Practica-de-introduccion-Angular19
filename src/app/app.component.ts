import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SpinnerComponent } from "./components/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, NavBarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practica-introduccion';
}
