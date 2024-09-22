import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.page.html',
  styleUrls: ['./lecciones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LeccionesPage implements OnInit {

  constructor(private _navCtrl: NavController) { }

  ngOnInit() {
  }

  verDesafio1() {
    this._navCtrl.navigateForward('/desafio-one');
  }

  verDesafio2() {
    this._navCtrl.navigateForward('/desafio-two');
  }

  verDesafio3() {
    this._navCtrl.navigateForward('/desafio-three');
  }

  verDesafio4() {
    this._navCtrl.navigateForward('/desafio-four');
  }

  verDesafio5() {
    this._navCtrl.navigateForward('/desafio-five');
  }

  goBack() {
    window.history.back();
  }
}
