import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsersService } from 'src/app/service/users.service';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.page.html',
  styleUrls: ['./puntaje.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PuntajePage implements OnInit {
  id: string = '';
  puntaje: any[] = [];
  myChartPuntaje: Chart<'pie'> | null = null;

  constructor(private _navCtrl: NavController, private _usersService: UsersService) {
    this._usersService.getSession('id').then((data: any) => {
      this.id = data;
      this.getUsuario();
    })
  }

  ngOnInit() {
    Chart.register(...registerables);
  }

  getUsuario() {
    let datos = {
      accion: 'puntaje',
      usuario_id: this.id
    }
    this._usersService.postData(datos).subscribe((data: any) => {
      if (data.estado == true) {
        this.puntaje = data.puntaje;
        this.generarChart();
      } else {
        this._usersService.showToast(data.mensaje);
      }
    })
  }

  generarChart() {
    const canvas = document.getElementById('myChartPuntaje') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = this.puntaje.map(item => `Desafío ${item.desafio}`);
      const data = this.puntaje.map(item => item.promedio_puntaje);

      this.myChartPuntaje = new Chart<'pie'>(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Mi Puntaje',
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderColor: '#FFFFFF',
          }],
        },
        options: {
          responsive: true,
        },
      });
    } else {
      console.error("No se pudo obtener el contexto del canvas");
    }
  }

  goBack() {
    this._navCtrl.back();
  }
}
