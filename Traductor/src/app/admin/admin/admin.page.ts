import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarPage } from "../navbar/navbar.page";
import { IonicModule, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/service/users.service';
import { RouterLink } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage, RouterLink]
})
export class AdminPage implements OnInit {
  admins: any[] = [];

  constructor(private _adminService: AdminService, private _navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAdmin();
  }

  getAdmin() {
    let datos = {
      accion: 'consultar'
    }

    this._adminService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this.admins = data.admins;
      } else {
        this._adminService.showToast(data.mensaje);
      }
    })
  }

  agregar() {
    this._navCtrl.navigateForward('/admin/nuevo');
  }

  editar(id: number) {
    this._navCtrl.navigateForward('/admin/' + id);
  }

  eliminarAdmin(id: number) {
    let datos = {
      accion: 'eliminar',
      id
    }
    this._adminService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this._adminService.showToast(data.mensaje);
        this.getAdmin();
      } else {
        this._adminService.showToast(data.mensaje);
      }
    })
  }
}
