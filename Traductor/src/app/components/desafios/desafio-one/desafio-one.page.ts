import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-desafio-one',
  templateUrl: './desafio-one.page.html',
  styleUrls: ['./desafio-one.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DesafioOnePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }
}
