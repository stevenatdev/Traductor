import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/service/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SignupPage implements OnInit {
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  terminos: boolean = false;

  constructor(private _usersService: UsersService, private _navCtrl: NavController) {
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.telefono = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit() {
  }

  registrar() {
    if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._usersService.showToast('Todos los campos son obligatorios');
    } else if (this.password.length < 8) {
      this._usersService.showToast('La contraseña debe tener al menos 8 caracteres');
    } else if (this.password != this.confirmPassword) {
      this._usersService.showToast('Las contraseñas no coinciden');
    } else {
      let datos = {
        accion: 'registrar',
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        telefono: this.telefono,
        password: this.password
      }
      this._usersService.postData(datos).subscribe((data: any) => {
        console.log(data);
        if (data.estado == true) {
          this._usersService.showToast(data.mensaje);
          this._navCtrl.navigateRoot(['/login']);
        } else {
          this._usersService.showToast(data.mensaje);
        }
      })
    }
  }

  /* registrar() {
    if (this.password != this.confirmPassword) {
      this._usersService.showToast('Las contraseñas no coinciden');
    } else if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._usersService.showToast('Todos los campos son obligatorios');
    } else {
      let datos = {
        accion: 'registrar',
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        telefono: this.telefono,
        password: this.password
      }
      this._usersService.postData(datos).subscribe((data: any) => {
        console.log(data);
        if (data.estado == true) {
          this._usersService.showToast(data.mensaje);
          this._navCtrl.navigateRoot(['/login']);
        } else {
          this._usersService.showToast(data.mensaje);
        }
      })
    }
  } */
}
