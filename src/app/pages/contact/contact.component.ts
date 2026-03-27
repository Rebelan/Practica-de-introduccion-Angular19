import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {

  enviado = false;
  contactForm: any;

  constructor(private fb: FormBuilder) {}

  // ✅ GSAP variables
  private tl = gsap.timeline({ paused: false });
  private mm = gsap.matchMedia();
  private removeMouseListener?: () => void;

  ngOnInit() {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      aceptar: [false, [Validators.requiredTrue]],
    });
  }

  get f(){ return this.contactForm.controls; }

  onSubmit(){
    if(this.contactForm.invalid){
      this.contactForm.markAllAsTouched();
      return;
    }
    this.enviado = true;
  }

  // ✅ GSAP
  ngAfterViewInit(): void {

    gsap.registerPlugin(ScrollTrigger);

    // ✅ Ejercicio 7: timeline controlable
    this.tl.to('.contact-box', { x: 200, duration: 1 });

    // ✅ Ejercicio 9: ScrollTrigger
    gsap.from('.contact-info', {
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: -50,
      opacity: 0,
      duration: 1
    });

    // ✅ Ejercicio 10: quickSetter
    const moverx = gsap.quickSetter('.cursor-ball', 'x', 'px');
    const listener = (e: MouseEvent) => moverx(e.clientX);
    window.addEventListener('mousemove', listener);
    this.removeMouseListener = () => window.removeEventListener('mousemove', listener);

    // ✅ Ejercicio 11: matchMedia
    this.mm.add("(max-width: 767px)", () => {
      return gsap.to('.contact-title', { scale: 0.8, duration: 1 });
    });

    this.mm.add("(min-width: 768px)", () => {
      return gsap.from('.contact-title', { x: -100, opacity: 0, duration: 1 });
    });

    // ✅ Guardar timeline en el elemento para botones Play/Pause/Reverse
    const box = document.querySelector('.contact-box') as any;
    if (box) box.__timeline = this.tl;
  }

  ngOnDestroy(): void {
    this.tl.kill();     // ✅ Ejercicio 12: destruir timeline
    this.mm.kill();     // ✅ limpiar matchMedia
    if (this.removeMouseListener) this.removeMouseListener();  // ✅ limpiar quickSetter listener
  }
}