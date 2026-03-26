import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resaltar',
  standalone: true
})
export class ResaltarPipe implements PipeTransform {

  transform(texto: string): string {
    return `<b>${texto}</b>`;
  }

}
