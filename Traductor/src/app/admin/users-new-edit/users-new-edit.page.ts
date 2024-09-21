import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular/standalone';
import { UsersService } from 'src/app/service/users.service';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-new-edit',
  templateUrl: './users-new-edit.page.html',
  styleUrls: ['./users-new-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UsersNewEditPage implements OnInit {
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
  constructor(private _usersService: UsersService, private _navCtrl: NavController, private route: ActivatedRoute) {
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
      this.getUsuario();
    }
  }

  registrar() {
    if (this.cedula == '' || this.nombre == '' || this.apellido == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._usersService.showToast('Todos los campos son obligatorios');
    } else if (this.password.length < 8) {
      this._usersService.showToast('La contraseña debe tener al menos 8 caracteres');
    } else if (this.password != this.confirmPassword) {
      this._usersService.showToast('Las contraseñas no coinciden');
    } else if (this.id != 0) {
      this.editar();
    } else {
      this.guardar();
    }
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
    this._usersService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this._usersService.showToast(data.mensaje);
        this._navCtrl.navigateRoot(['/admin/user/lista']);
      } else {
        this._usersService.showToast(data.mensaje);
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
    this._usersService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this._usersService.showToast(data.mensaje);
        this._navCtrl.navigateRoot(['/admin/user/lista']);
      } else {
        this._usersService.showToast(data.mensaje);
      }
    })
  }

  regresar() {
    this._navCtrl.navigateRoot(['/admin/user/lista']);
  }
}
