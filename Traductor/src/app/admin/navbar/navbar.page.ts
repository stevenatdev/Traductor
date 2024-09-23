import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class NavbarPage implements OnInit {

  constructor(private _adminService: AdminService, private _navCtrl: NavController) { }

  ngOnInit() {
  }

  dashboard() {
    this._navCtrl.navigateRoot('/dashboard');
  }

  usuarios() {
    this._navCtrl.navigateRoot('/admin/user/lista');
  }

  admins() {
    this._navCtrl.navigateRoot('/admins');
  }

  perfil() {
    this._navCtrl.navigateRoot('/admin/user/profile');
  }

  salir() {
    this._adminService.closeSession();
    this._navCtrl.navigateRoot('/admin/login');
  }
}
