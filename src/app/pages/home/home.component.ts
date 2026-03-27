import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import gsap from 'gsap';
import { SocketMessage, WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CardComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private tl = gsap.timeline();

  mensajes: SocketMessage[] = [];
  estado = 'Conectando...';
  private sub?: Subscription;

  constructor(private ws: WebsocketService) { }


  ngOnInit() {
    const socket$ = this.ws.connect();

    //mostrar mensajes recibidos
    this.sub = socket$.subscribe({
      next: msg => {
        this.estado = 'Conectado!';
        this.mensajes.unshift(msg);
      },

      //Manejar errores
      error: err => {
        console.error("Error en WebSocket: ", err);
        this.estado = "Error!";
      },
      //Cierre de conexión
      complete: () => {
        this.estado = "Conexión cerrada!";
      }
    });
  }


  //Enviar mensaje al servidor
  enviar() {
    this.ws.send({
      type: "client-message",
      payload: "Hola servidor desde Angular"
    });
  }


  ngAfterViewInit(): void {

    //animar titulo
    gsap.from('.home-title', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    //Secuencia de titulo -> subtitulo -> botón
    this.tl
      .from('.home-subtitle', { y: 40, opacity: 0, duration: 1 })
      .from('.home-btn', { scale: 0, opacity: 0, duration: 0.6 }, '-=0.5');

    //animacion repetitiva
    gsap.to('.home-ball', {
      y: 50,
      repeat: -1,
      yoyo: true,
      duration: 0.6
    });

    document.querySelector('.home-cta')?.addEventListener('click', () => {
      gsap.to('.home-cta', { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 });
    });
  }

  ngOnDestroy(): void {
    this.tl.kill(); //limpieza al salir de la página

    //Cerrar al destruir
    this.sub?.unsubscribe();
    this.ws.close();
  }
}
