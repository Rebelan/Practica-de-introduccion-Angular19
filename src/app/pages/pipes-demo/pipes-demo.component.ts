import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SaludoPipe } from '../../pipes/saludo.pipe';
import { DoblePipe } from '../../pipes/doble.pipe';
import { ResaltarPipe } from '../../pipes/resaltar.pipe';
import { EdadPipe } from '../../pipes/edad.pipe';

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [
    CommonModule,
    SaludoPipe,
    DoblePipe,
    ResaltarPipe,
    EdadPipe
  ],
  templateUrl: './pipes-demo.component.html',
  styleUrl: './pipes-demo.component.scss'
})
export class PipesDemoComponent {
  nombre: string = 'abel constantino muñoz';
  fechaActual: Date = new Date();
  precio: number = 49.99;
  progreso: number = 0.73;
  textoLargo: string = 'Angular considerado un framework alucinante para desarrollar aplicaciones web';

  usuario = {
    nombre: 'abel',
    apellido: 'Constantino',
    edad: 26,
    ciudad: 'Mérida'
  };

  numero: number = 10;
  nacimiento: string = '2000/01/31'
  texto: string = 'Textito en negrita'
}
