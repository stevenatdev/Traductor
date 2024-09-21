import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin-new-edit',
  templateUrl: './admin-new-edit.page.html',
  styleUrls: ['./admin-new-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminNewEditPage implements OnInit {
  id: number;
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  password: string;
  confirmPassword: string;
  terminos: boolean = false;
  operacion: string;
  constructor(private _adminService: AdminService, private _navCtrl: NavController, private route: ActivatedRoute) {
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.correo = '';
    this.telefono = '';
    this.password = '';
    this.confirmPassword = '';
    this.operacion = 'Añadir';

    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.getAdmin();
    }
  }

  registrar() {
    if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._adminService.showToast('Todos los campos son obligatorios');
    } else if (this.password.length < 8) {
      this._adminService.showToast('La contraseña debe tener al menos 8 caracteres');
    } else if (this.password != this.confirmPassword) {
      this._adminService.showToast('Las contraseñas no coinciden');
    } else if (this.id != 0) {
      this.editar();
    } else {
      this.guardar();
    }
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

  guardar() {
    let datos = {
      accion: 'registrar',
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
        this._navCtrl.navigateRoot(['/admins']);
      } else {
        this._adminService.showToast(data.mensaje);
      }
    })
  }

  editar() {
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
        this._navCtrl.navigateRoot(['/admins']);
      } else {
        this._adminService.showToast(data.mensaje);
      }
    })
  }

  regresar() {
    this._navCtrl.navigateRoot(['/admins']);
  }
}
