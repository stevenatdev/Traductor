import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-desafio-five',
  templateUrl: './desafio-five.page.html',
  styleUrls: ['./desafio-five.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DesafioFivePage implements OnInit {

  constructor(private _navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this._navCtrl.back();
  }
}
