import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RecuperarPasswordPage implements OnInit {
  cedula: string;
  correo: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  terminos: boolean = false;

  constructor(private _usersService: UsersService, private _navCtrl: NavController) {
    this.cedula = '';
    this.correo = '';
    this.telefono = '';
    this.password = '';
    this.confirmPassword = '';
  }
  ngOnInit() {
  }

  cambiarPassword() {
    if (this.password != this.confirmPassword) {
      this._usersService.showToast('Las contraseñas no coinciden');
    } else if (this.cedula == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._usersService.showToast('Todos los campos son obligatorios');
    } else {
      let datos = {
        accion: 'cambiarPassword',
        cedula: this.cedula,
        correo: this.correo,
        telefono: this.telefono,
        password: this.password
      }
      this._usersService.postData(datos).subscribe((data: any) => {
        console.log(data);
        if (data.estado == true) {
          this._usersService.showToast('Contraseña cambiada correctamente');
          this._navCtrl.navigateRoot(['/login']);
        } else {
          this._usersService.showToast('Error al cambiar la contraseña');
        }
      })
    }
  }
}
