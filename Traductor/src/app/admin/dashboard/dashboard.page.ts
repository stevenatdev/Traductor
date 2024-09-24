import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarPage } from '../navbar/navbar.page';
import { UsersService } from 'src/app/service/users.service';
import { AdminService } from 'src/app/service/admin.service';
import { Chart, registerables } from 'chart.js'; // Importa los elementos necesarios

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarPage]
})
export class DashboardPage implements OnInit {
  admins: any[] = [];
  usuarios: any[] = [];
  promedios: any[] = [];
  participaciones: any[] = [];
  participacion: any[] = [];
  distribucion: any[] = [];
  mejores: any[] = [];
  resumen: any[] = [];
  totalParticipaciones: number = 0;
  puntajeTotal: number = 0;
  participacionesPorDia: any[] = [];

  // Gráficos de barras
  myChart: Chart<'bar'> | null = null;
  myChartTotal: Chart<'bar'> | null = null;
  myChartParticipacionesPorDia: Chart<'bar'> | null = null;

  // Gráficos de pastel
  myChartParticipaciones: Chart<'pie'> | null = null;
  myChartDistribucion: Chart<'pie'> | null = null;
  myChartMejores: Chart<'pie'> | null = null;
  myChartResumen: Chart<'pie'> | null = null;

  constructor(private _usersService: UsersService, private _adminService: AdminService) { }

  ngOnInit() {
    // Registra todos los componentes necesarios para Chart.js
    Chart.register(...registerables);
    this.getAdmin();
    this.getUsers();
    this.generarParticipacion();

    // Gráficos
    this.generarGraficoPromedioPorDesafio();
    this.generarGraficoParticipaciones();
    this.generarGraficoDistribucion();
    this.generarGraficoMejores();
    this.generarGraficoResumen();
    this.generarGraficoTotalYpuntajeGeneral();
    this.generarGraficoParticipacionesPorDia();
  }

  getAdmin() {
    let datos = {
      accion: 'totalAdmins'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado == true) {
        this.admins = data.admins;
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  getUsers() {
    let datos = {
      accion: 'tatalUsers'
    };

    this._usersService.postData(datos).subscribe((data: any) => {
      console.log(data);

      if (data.estado == true) {
        this.usuarios = data.users;
      } else {
        this._usersService.showToast(data.mensaje);
      }
    });
  }

  generarParticipacion() {
    const datos = {
      accion: 'participaciones'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado === true) {
        this.participacion = data.participacion;
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  generarGraficoPromedioPorDesafio() {
    let datos = {
      accion: 'promedio_por_desafio'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado) {
        this.promedios = data.promedios; // Guardar los datos
        this.generarChart(); // Llamar a la función para generar el gráfico
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  generarChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = this.promedios.map(item => `Desafío ${item.desafio}`); // Obtener etiquetas
      const data = this.promedios.map(item => item.promedio_puntaje); // Obtener datos

      this.myChart = new Chart<'bar'>(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Promedios',
              data: data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error("No se pudo obtener el contexto del canvas");
    }
  }

  generarGraficoParticipaciones() {
    const datos = {
      accion: 'total_participaciones'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado === true) {
        this.participaciones = data.participaciones;
        this.generarChartParticipaciones();
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  // Generar el gráfico de participaciones
  generarChartParticipaciones() {
    const canvas = document.getElementById('myChartParticipaciones') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = this.participaciones.map(item => `Desafío ${item.desafio}`);
      const data = this.participaciones.map(item => item.total_participaciones);

      this.myChartParticipaciones = new Chart<'pie'>(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total de Participaciones por Desafío',
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

  // Obtener datos para el gráfico de distribución de puntajes
  generarGraficoDistribucion() {
    const datos = {
      accion: 'distribucion_puntajes'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado === true) {
        this.distribucion = data.distribucion;
        this.generarChartDistribucion();
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  // Generar el gráfico de distribución de puntajes
  generarChartDistribucion() {
    const canvas = document.getElementById('myChartDistribucion') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = this.distribucion.map(item => `Puntaje ${item.puntaje}`);
      const data = this.distribucion.map(item => item.cantidad);

      this.myChartDistribucion = new Chart<'pie'>(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Distribución de Puntajes',
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

  // Obtener datos para el gráfico de mejores puntajes
  generarGraficoMejores() {
    const datos = {
      accion: 'mejores_puntajes'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado === true) {
        this.mejores = data.mejores;
        this.generarChartMejores();
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  // Generar el gráfico de mejores puntajes
  generarChartMejores() {
    const canvas = document.getElementById('myChartMejores') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = this.mejores.map(item => `Desafío ${item.desafio}`);
      const data = this.mejores.map(item => item.max_puntaje);

      this.myChartMejores = new Chart<'pie'>(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Mejores Puntajes por Desafío',
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

  // Obtener datos para el gráfico de resumen de puntajes
  generarGraficoResumen() {
    const datos = {
      accion: 'puntajes_resumen'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado === true) {
        this.resumen = data.resumen;
        this.generarChartResumen();
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  // Generar el gráfico de resumen de puntajes
  generarChartResumen() {
    const canvas = document.getElementById('myChartResumen') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = this.resumen.map(item => `Desafío ${item.desafio}`);
      const minData = this.resumen.map(item => item.puntaje_minimo);
      const maxData = this.resumen.map(item => item.puntaje_maximo);
      const avgData = this.resumen.map(item => item.puntaje_promedio);

      // Concatenar los datos en un solo array para el gráfico de pie
      const totalData = minData.concat(maxData, avgData);
      const totalLabels = [...minData.map(() => 'Mínimo'), ...maxData.map(() => 'Máximo'), ...avgData.map(() => 'Promedio')];

      this.myChartResumen = new Chart<'pie'>(ctx, {
        type: 'pie',
        data: {
          labels: totalLabels,
          datasets: [{
            label: 'Resumen de Puntajes',
            data: totalData,
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

  // Obtener datos para el gráfico de total de participaciones y puntaje general
  generarGraficoTotalYpuntajeGeneral() {
    const datos = {
      accion: 'total_y_puntaje_general'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado === true) {
        this.totalParticipaciones = data.total_participaciones;
        this.puntajeTotal = data.puntaje_total;
        this.generarChartTotal();
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  // Generar el gráfico de total de participaciones y puntaje general
  generarChartTotal() {
    const canvas = document.getElementById('myChartTotal') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = ['Total Participaciones', 'Puntaje Total'];
      const data = [this.totalParticipaciones, this.puntajeTotal];

      this.myChartTotal = new Chart<'bar'>(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total de Participaciones y Puntaje',
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB'],
            borderColor: '#1E88E5',
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
        },
      });
    } else {
      console.error("No se pudo obtener el contexto del canvas");
    }
  }

  // Obtener datos para el gráfico de participaciones por día
  generarGraficoParticipacionesPorDia() {
    const datos = {
      accion: 'participaciones_por_dia'
    };

    this._adminService.postData(datos).subscribe((data: any) => {
      console.log(data);
      if (data.estado === true) {
        this.participacionesPorDia = data.participaciones;
        this.generarChartParticipacionesPorDia();
      } else {
        this._adminService.showToast(data.mensaje);
      }
    });
  }

  // Generar el gráfico de participaciones por día
  generarChartParticipacionesPorDia() {
    const canvas = document.getElementById('myChartParticipacionesPorDia') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const labels = this.participacionesPorDia.map(item => item.dia);
      const data = this.participacionesPorDia.map(item => item.participaciones);

      this.myChartParticipacionesPorDia = new Chart<'bar'>(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Participaciones por Día',
            data: data,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
        },
      });
    } else {
      console.error("No se pudo obtener el contexto del canvas");
    }
  }
}
