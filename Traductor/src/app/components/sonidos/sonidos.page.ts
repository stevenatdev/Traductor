import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslationService } from 'src/app/service/translation.service';

@Component({
  selector: 'app-sonidos',
  templateUrl: './sonidos.page.html',
  styleUrls: ['./sonidos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SonidosPage implements OnInit {
  texto: any = [];
  translation: string = '';
  translationFamilia: string = '';
  translationJuguetes: string = '';
  translationAnimales: string = '';
  translationSaludos: string = '';

  constructor(private _navCtrl: NavController, private _translationService: TranslationService) { }

  ngOnInit() {
  }

  traducir(texto: string) {
    let datos = {
      "accion": "traducir",
      "palabra": texto.toLowerCase()
    };
    this._translationService.postData(datos).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res);
      if (res.estado) {
        this.texto = res.textos[0];

        if (this.texto.palabraes == texto.toLowerCase()) {
          this.translation = this.texto.palabrash;
        } else if (this.texto.palabrash == texto.toLowerCase()) {
          this.translation = this.texto.palabraes;
        }
      }
      else {
        this.translation = 'No existe esta palabra en la base de datos.';
      }
    });
  }

  traducirFamilia(texto: string) {
    let datos = {
      "accion": "traducir",
      "palabra": texto.toLowerCase()
    };
    this._translationService.postData(datos).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res);
      if (res.estado) {
        this.texto = res.textos[0];

        if (this.texto.palabraes == texto.toLowerCase()) {
          this.translationFamilia = this.texto.palabrash;
        } else if (this.texto.palabrash == texto.toLowerCase()) {
          this.translationFamilia = this.texto.palabraes;
        }
      }
      else {
        this.translationFamilia = 'No existe esta palabra en la base de datos.';
      }
    });
  }

  traducirJuguetes(texto: string) {
    let datos = {
      "accion": "traducir",
      "palabra": texto.toLowerCase()
    };
    this._translationService.postData(datos).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res);
      if (res.estado) {
        this.texto = res.textos[0];

        if (this.texto.palabraes == texto.toLowerCase()) {
          this.translationJuguetes = this.texto.palabrash;
        } else if (this.texto.palabrash == texto.toLowerCase()) {
          this.translationJuguetes = this.texto.palabraes;
        }
      }
      else {
        this.translationJuguetes = 'No existe esta palabra en la base de datos.';
      }
    });
  }

  traducirAnimales(texto: string) {
    let datos = {
      "accion": "traducir",
      "palabra": texto.toLowerCase()
    };
    this._translationService.postData(datos).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res);
      if (res.estado) {
        this.texto = res.textos[0];

        if (this.texto.palabraes == texto.toLowerCase()) {
          this.translationAnimales = this.texto.palabrash;
        } else if (this.texto.palabrash == texto.toLowerCase()) {
          this.translationAnimales = this.texto.palabraes;
        }
      }
      else {
        this.translationAnimales = 'No existe esta palabra en la base de datos.';
      }
    });
  }

  traducirSaludos(texto: string) {
    let datos = {
      "accion": "traducir",
      "palabra": texto.toLowerCase()
    };
    this._translationService.postData(datos).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res);
      if (res.estado) {
        this.texto = res.textos[0];

        if (this.texto.palabraes == texto.toLowerCase()) {
          this.translationSaludos = this.texto.palabrash;
        } else if (this.texto.palabrash == texto.toLowerCase()) {
          this.translationSaludos = this.texto.palabraes;
        }
      }
      else {
        this.translationSaludos = 'No existe esta palabra en la base de datos.';
      }
    });
  }

  goBack() {
    this._navCtrl.back();
  }
}
