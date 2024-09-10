import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarPage } from "../navbar/navbar.page";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage]
})
export class UsersListPage implements OnInit {
  usuarios = [
    {
      id: 1,
      nombre: 'Steve',
      email: 'wUqJY@example.com',
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  agregarUsuario() {

  }

  editarUsuario(id: number) {

  }

  eliminarUsuario(id: number) {

  }
}
