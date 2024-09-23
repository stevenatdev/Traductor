import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarPage } from "../navbar/navbar.page";
import { IonicModule, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/service/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage, RouterLink]
})
export class UsersListPage implements OnInit {
  usuarios: any[] = [];

  constructor(private _usersService: UsersService, private _navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUsers();
  }

  getUsers() {
    let datos = {
      accion: 'consultar'
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

  agregar() {
    this._navCtrl.navigateForward('/admin/user/nuevo');
  }

  editar(id: number) {
    this._navCtrl.navigateForward('/admin/user/' + id);
  }

  eliminarUsuario(id: number) {
    let datos = {
      accion: 'eliminar',
      id
    }
    this._usersService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this._usersService.showToast(data.mensaje);
        this.getUsers();
      } else {
        this._usersService.showToast(data.mensaje);
      }
    })
  }
}
