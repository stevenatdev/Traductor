import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from 'src/app/service/translation.service';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.page.html',
  styleUrls: ['./traductor.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, FormsModule, ReactiveFormsModule]
})
export class TraductorPage implements OnInit {
  fromLanguage: string = 'shuar'; // Idioma de origen por defecto
  // textToTranslate: string = '';
  translation: string = '';

  // FormControl para manejar el input
  textControl: FormControl = new FormControl();

  subscription: Subscription | undefined;

  constructor(private _translationService: TranslationService) { }

  ngOnInit(): void {
    this.translate();
  }

  translate() {
    this.subscription = this.textControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (value.trim() === '') {
          this.translation = '';
          return [];
        }

        return this._translationService.translate(this.fromLanguage, value);
      })
    ).subscribe(data => {
      console.log("Respuesta del backend:", data);
      if (data && data.translation) {
        this.translation = data.translation; // Asegúrate de que este campo coincide con el que devuelve el backend
      } else {
        this.translation = 'No se encontró la traducción.';
      }
    }, error => {
      console.error('Error en la traducción:', error);
      this.translation = 'Error al realizar la traducción.';
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Método para cambiar el idioma de origen
  toggleLanguage(): void {
    this.textControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        if (value.trim() === '') {
          this.translation = '';
          return [];
        }

        return this._translationService.translate(this.fromLanguage, value);
      })
    ).subscribe(data => {
      console.log("Respuesta del backend:", data);
      if (data && data.translation) {
        this.translation = data.translation; // Asegúrate de que este campo coincide con el que devuelve el backend
      } else {
        this.translation = 'No se encontró la traducción.';
      }
    }, error => {
      console.error('Error en la traducción:', error);
      this.translation = 'Error al realizar la traducción.';
    });
  }
}
