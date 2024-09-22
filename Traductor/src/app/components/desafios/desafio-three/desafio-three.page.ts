import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-desafio-three',
  templateUrl: './desafio-three.page.html',
  styleUrls: ['./desafio-three.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DesafioThreePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }
}
