import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doble',
  standalone: true
})
export class DoblePipe implements PipeTransform {

  transform(valor: number): number {
    return valor * 2;
  }
}
