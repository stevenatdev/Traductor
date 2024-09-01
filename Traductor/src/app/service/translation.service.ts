import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private appUrl = environment.endpoint;
  private apiUrl = 'api/translation';

  private _http = inject(HttpClient);

  translate(from: string, text: string): Observable<any> {
    return this._http.post(`${this.appUrl}${this.apiUrl}`, { from, text });
  }
}
