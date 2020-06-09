import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
interface ConfigObject {
  apiKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
private _config: any;

constructor(private http: HttpClient) { }

load() {
  return new Promise((resolve, reject) => {
      this.http.get('../assets/config.json')
          .subscribe((config) => {
              this._config = config;
              resolve(true);
          },
          (error: any) => {
              console.error(error);
              return Observable.throw(error.json().error || 'Server error');
          });
  });
}

get config() {
  return this._config;
}

get apiKey() {
  return this._config['apiKey'];
}



}

export function ConfigFactory(config: ConfigService) {
  return () => config.load();
}

export function init() {
  return {
      provide: APP_INITIALIZER,
      useFactory: ConfigFactory,
      deps: [ConfigService],
      multi: true
  }
}

const ConfigModule = {
  init: init
}

export { ConfigModule };
