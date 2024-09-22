import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

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

  constructor(private _adminService: AdminService, private _navCtrl: NavController) {
    this.cedula = '';
    this.password = '';
  }

  login() {
    if (this.cedula == '' || this.password == '') {
      this._adminService.showToast('Todos los campos son obligatorios');
    } else {
      let datos = {
        accion: 'login',
        cedula: this.cedula,
        password: this.password
      }
      this._adminService.postData(datos).subscribe((data: any) => {
        console.log(data);
        if (data.estado == true) {
          this._adminService.createSession('idAdmin', data.adminSession[0].idAdmin);
          this._adminService.createSession('nombre', data.adminSession[0].nombre);
          this._adminService.showToast(data.mensaje);
          this._navCtrl.navigateRoot(['/dashboard']);
        } else {
          this._adminService.showToast(data.mensaje);
        }
      })
    }
  }

  ngOnInit() {
  }

}
