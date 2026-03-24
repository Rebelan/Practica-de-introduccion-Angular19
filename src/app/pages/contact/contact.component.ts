import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  enviado = false;
  contactForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      aceptar: [false, [Validators.requiredTrue]],
    });
  }

  get f(){return this.contactForm.controls;}

  onSubmit(){
    if(this.contactForm.invalid){
      this.contactForm.markAllAsTouched();
      return;
    }
    console.log('Contacto', this.contactForm.value);
    this.enviado = true;
  }
}
