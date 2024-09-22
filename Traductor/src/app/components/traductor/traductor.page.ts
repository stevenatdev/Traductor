import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.page.html',
  styleUrls: ['./traductor.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule, ReactiveFormsModule]
})
export class TraductorPage implements OnInit {

  constructor(private _navCtrl: NavController) { }

  ngOnInit(): void {
  }

  aprender() {
    this._navCtrl.navigateRoot(['/aprender']);
  }

  sonidos() {
    this._navCtrl.navigateRoot(['/sonidos']);
  }

  desafios() {
    this._navCtrl.navigateRoot(['/lecciones']);
  }

  regresar() {
    this._navCtrl.navigateRoot(['/home']);
  }

  perfil() {
    this._navCtrl.navigateRoot(['/profile']);
  }
}
