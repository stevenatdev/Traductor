import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.page.html',
  styleUrls: ['./traductor.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule, ReactiveFormsModule]
})
export class TraductorPage implements OnInit {

  constructor(private _navCtrl: NavController, private _usersService: UsersService) { }

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
    this._usersService.closeSession();
    this._navCtrl.navigateRoot(['/home']);
  }

  perfil() {
    this._navCtrl.navigateRoot(['/profile']);
  }
}
