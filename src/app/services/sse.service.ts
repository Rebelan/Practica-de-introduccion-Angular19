import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SseService {


  constructor(private zone: NgZone) { }

  connect(url: string): Observable<any>{
    return new Observable(observer => {
      
      const eventSource = new EventSource(url);
      
      //recibir mensajes
      eventSource.onmessage = (event) => {
        this.zone.run(()=>{
          try {
            //Parsear JSON
            const data = JSON.parse(event.data);
            observer.next(data);
          } catch (error) {
            console.error("JSON inválido recibido: ", error);
          }
        });
      };
      //evento personalizado progress
      eventSource.addEventListener('progress', (event: MessageEvent)=>{
        this.zone.run(()=>{
          try {
            observer.next({
              type: 'progress',
              data: JSON.parse(event.data)
            });
          } catch (error) {
            console.error("Error al parsear evento progress", error);
          }
        });
      });

      //Manejar errores de conexión
      eventSource.onerror = (error) => {
        this.zone.run(() => observer.error("Error en SSE "+error));
        eventSource.close();
      };

      //cerrar conexión al destruir
      return () => eventSource.close();

    });
  }
}
