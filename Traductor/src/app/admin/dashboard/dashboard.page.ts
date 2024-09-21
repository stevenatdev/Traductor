import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarPage } from '../navbar/navbar.page';
import { UsersService } from 'src/app/service/users.service';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage]
})
export class DashboardPage implements OnInit {
  admins: any[] = [];
  usuarios: any[] = [];

  constructor(private _usersService: UsersService, private _adminService: AdminService) { }

  ngOnInit() {
    this.getAdmin();
    this.getUsers();
  }

  getAdmin() {
    let datos = {
      accion: 'totalAdmins'
    }

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado == true) {
        this.admins = data.admins;
      } else {
        this._adminService.showToast(data.mensaje);
      }
    })
  }

  getUsers() {
    let datos = {
      accion: 'tatalUsers'
    }

    this._usersService.postData(datos).subscribe((data: any) => {
      console.log(data);

      if (data.estado == true) {
        this.usuarios = data.users;
      } else {
        this._usersService.showToast(data.mensaje);
      }
    })
  }
}
