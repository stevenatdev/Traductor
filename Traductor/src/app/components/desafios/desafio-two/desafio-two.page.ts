import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-desafio-two',
  templateUrl: './desafio-two.page.html',
  styleUrls: ['./desafio-two.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DesafioTwoPage implements OnInit {
  id: string = '';
  mostrarVentana: boolean = false;
  // Aquí se guardan las respuestas del usuario
  respuestas = {
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: '',
    pregunta5: '',
    pregunta6: '',
    pregunta7: '',
    pregunta8: '',
    pregunta9: '',
    pregunta10: ''
  };

  // Respuestas correctas para comparar
  correctas = {
    pregunta1: 'uunt_yawá',
    pregunta2: 'yawá',
    pregunta3: 'ampush',
    pregunta4: 'uyush',
    pregunta5: 'kuru',
    pregunta6: 'japa',
    pregunta7: 'waaka',
    pregunta8: 'paapu',
    pregunta9: 'kawai',
    pregunta10: 'shiampach'
  };

  puntaje = 0;

  constructor(private _usersService: UsersService, private _navCtrl: NavController) {
    this._usersService.getSession('id').then((data: any) => {
      this.id = data;
    })
  }

  ngOnInit() {
  }

  enviarRespuestas() {
    this.puntaje = 0; // Reiniciar el puntaje

    // Comparar las respuestas del usuario con las correctas
    if (this.respuestas.pregunta1 === this.correctas.pregunta1) this.puntaje++;
    if (this.respuestas.pregunta2 === this.correctas.pregunta2) this.puntaje++;
    if (this.respuestas.pregunta3 === this.correctas.pregunta3) this.puntaje++;
    if (this.respuestas.pregunta4 === this.correctas.pregunta4) this.puntaje++;
    if (this.respuestas.pregunta5 === this.correctas.pregunta5) this.puntaje++;
    if (this.respuestas.pregunta6 === this.correctas.pregunta6) this.puntaje++;
    if (this.respuestas.pregunta7 === this.correctas.pregunta7) this.puntaje++;
    if (this.respuestas.pregunta8 === this.correctas.pregunta8) this.puntaje++;
    if (this.respuestas.pregunta9 === this.correctas.pregunta9) this.puntaje++;
    if (this.respuestas.pregunta10 === this.correctas.pregunta10) this.puntaje++;

    console.log('Puntaje obtenido: ', this.puntaje);

    this.mostrarVentana = true;

    this.guardarPuntaje();
  }

  guardarPuntaje() {
    let datos = {
      accion: 'guardarPuntaje',
      usuario_id: this.id,
      puntaje: this.puntaje,
      desafio: 2
    }
    this._usersService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        console.log(data.mensaje);
      } else {
        console.log(data.mensaje);
      }
    })
  }

  goBack() {
    window.history.back();
  }

  cerrarVentana() {
    this.mostrarVentana = false;
    this._navCtrl.navigateRoot(['/lecciones']);
  }
}
