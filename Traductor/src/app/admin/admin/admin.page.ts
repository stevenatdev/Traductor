import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarPage } from "../navbar/navbar.page";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage]
})
export class AdminPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
