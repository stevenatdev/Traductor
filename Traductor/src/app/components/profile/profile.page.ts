import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  constructor(private _usersService: UsersService, private _navCtrl: NavController) {
    this.id = '';
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.telefono = '';
    this.password = '';
    this.confirmPassword = '';

    this._usersService.getSession('id').then((data: any) => {
      this.id = data;
      this.getUsuario();
    })
  }
  ngOnInit() {
  }

  getUsuario() {
    let datos = {
      accion: 'getUsuario',
      id: this.id
    }
    this._usersService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this.cedula = data.user.cedula;
        this.nombre = data.user.nombre;
        this.apellido = data.user.apellido;
        this.correo = data.user.correo;
        this.telefono = data.user.telefono;
        this.password = data.user.password;
        this.confirmPassword = data.user.password;
      } else {
        this._usersService.showToast(data.mensaje);
      }
    })
  }

  actualizar() {
    if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._usersService.showToast('Todos los campos son obligatorios');
    } else if (this.password.length < 8) {
      this._usersService.showToast('La contraseña debe tener al menos 8 caracteres');
    } else if (this.password != this.confirmPassword) {
      this._usersService.showToast('Las contraseñas no coinciden');
    } else {
      let datos = {
        accion: 'actualizar',
        id: this.id,
        cedula: this.cedula,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        telefono: this.telefono,
        password: this.password
      }
      this._usersService.postData(datos).subscribe((data: any) => {
        if (data.estado == true) {
          this._usersService.showToast(data.mensaje);
          this._navCtrl.navigateRoot(['/traductor']);
        } else {
          this._usersService.showToast(data.mensaje);
        }
      })
    }
  }

  goBack() {
    this._navCtrl.back();
  }
}
