import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, TranslatePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  private translate = inject(TranslateService);
  
  currentLang = signal('es');

  constructor() {
    this.translate.addLangs(['es','en']);
    this.translate.setFallbackLang('es').subscribe();

    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const langToUse = 
      savedLang && ['es', 'en'].includes(savedLang)
        ? savedLang
        : (browserLang && ['es', 'en'].includes(browserLang) ? browserLang : 'es');

    this.changeLanguage(langToUse);
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang).subscribe(() =>{
      this,this.currentLang.set(lang);
      localStorage.setItem('lang', lang);
    });
      
  }

}
