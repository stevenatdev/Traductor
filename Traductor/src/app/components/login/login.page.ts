import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  cedula: string;
  password: string;

  constructor(private _userService: UsersService, private _navCtrl: NavController) {
    this.cedula = '';
    this.password = '';
  }

  login() {
    if (this.cedula == '' || this.password == '') {
      this._userService.showToast('Todos los campos son obligatorios');
    } else {
      let datos = {
        accion: 'login',
        cedula: this.cedula,
        password: this.password
      }
      this._userService.postData(datos).subscribe((data: any) => {
        console.log(data);
        if (data.estado == true) {
          this._userService.createSession('id', data.userSession[0].id);
          this._userService.createSession('nombre', data.userSession[0].nombre);
          this._userService.showToast(data.mensaje);
          this._navCtrl.navigateRoot(['/traductor']);
        } else {
          this._userService.showToast(data.mensaje);
        }
      })
    }
  }

  ngOnInit() {
  }

}
