import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

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

  constructor(private _adminService: AdminService, private _navCtrl: NavController) {
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
      this._adminService.showToast('Las contraseñas no coinciden');
    } else if (this.cedula == '' || this.correo == '' || this.telefono == '' || this.password == '' || this.confirmPassword == '') {
      this._adminService.showToast('Todos los campos son obligatorios');
    } else if (this.password.length < 8) {
      this._adminService.showToast('La contraseña debe tener al menos 8 caracteres');
    } else {
      let datos = {
        accion: 'cambiarPassword',
        cedula: this.cedula,
        correo: this.correo,
        telefono: this.telefono,
        password: this.password
      }
      this._adminService.postData(datos).subscribe((data: any) => {
        console.log(data);
        if (data.estado == true) {
          this._adminService.showToast(data.mensaje);
          this._navCtrl.navigateRoot(['/admin/login']);
        } else {
          this._adminService.showToast(data.mensaje);
        }
      })
    }
  }
}
