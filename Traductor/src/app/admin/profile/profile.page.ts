import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarPage } from "../navbar/navbar.page";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage]
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
