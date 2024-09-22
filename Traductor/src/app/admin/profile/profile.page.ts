import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarPage } from "../navbar/navbar.page";
import { IonicModule, NavController } from '@ionic/angular';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage]
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
  constructor(private _adminService: AdminService, private _navCtrl: NavController) {
    this.id = '';
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.telefono = '';
    this.password = '';
    this.confirmPassword = '';

    this._adminService.getSession('idAdmin').then((data: any) => {
      console.log(data);
      this.id = data;
      this.getAdmin();
    })
  }
  ngOnInit() {
  }

  getAdmin() {
    let datos = {
      accion: 'getAdmin',
      id: this.id
    }
    this._adminService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this.cedula = data.admin.cedula;
        this.nombre = data.admin.nombre;
        this.apellido = data.admin.apellido;
        this.correo = data.admin.correo;
        this.telefono = data.admin.telefono;
        this.password = data.admin.password;
        this.confirmPassword = data.admin.password;
      } else {
        this._adminService.showToast(data.mensaje);
      }
    })
  }

  actualizar() {
    if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._adminService.showToast('Todos los campos son obligatorios');
    } else if (this.password.length < 8) {
      this._adminService.showToast('La contraseña debe tener al menos 8 caracteres');
    } else if (this.password != this.confirmPassword) {
      this._adminService.showToast('Las contraseñas no coinciden');
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
      this._adminService.postData(datos).subscribe((data: any) => {
        if (data.estado == true) {
          this._adminService.showToast(data.mensaje);
          this._navCtrl.navigateRoot(['/dashboard']);
        } else {
          this._adminService.showToast(data.mensaje);
        }
      })
    }
  }

  goBack() {
    this._navCtrl.back();
  }
}
