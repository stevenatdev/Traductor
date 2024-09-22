import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-desafio-four',
  templateUrl: './desafio-four.page.html',
  styleUrls: ['./desafio-four.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DesafioFourPage implements OnInit {

  constructor(private _navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack() {
    this._navCtrl.back();
  }
}
