import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private server = environment.endpointAdmin;

  private _http = inject(HttpClient);
  private _toastCtrl = inject(ToastController);

  constructor() { }

  postData(body: any) {
    let head = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = {
      headers: head
    };

    return this._http.post(this.server, JSON.stringify(body), options);
  }
  async showToast(mensaje: string) {
    const toast = await this._toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor
    });
  }

  async getSession(id: string) {
    const item = await Preferences.get({
      key: id
    });
    return item.value;
  }

  async closeSession() {
    await Preferences.clear();
  }
}
