import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.page.html',
  styleUrls: ['./lecciones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LeccionesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  verLeccion() {

  }
}
