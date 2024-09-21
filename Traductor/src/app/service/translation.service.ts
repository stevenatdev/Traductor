import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private appUrl = environment.endpoint;
  private apiUrl = 'api/translation';
  private server = environment.endpointphp;

  private _http = inject(HttpClient);
  private _toastCtrl = inject(ToastController);

  translate(from: string, text: string): Observable<any> {
    return this._http.post(`${this.appUrl}${this.apiUrl}`, { from, text });
  }

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
}
