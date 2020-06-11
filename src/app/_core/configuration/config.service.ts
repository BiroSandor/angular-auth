import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
private _config: Object;

constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  load() {
    return new Promise((resolve, reject) => {
        this.http.get('../../assets/config.json')
        .pipe(      
          this.errorHandlerService.handleError())
            .subscribe((config) => {
                this._config = config;
                resolve(true);
            });
    });
  }
  
  public getConfig(key: any) {
    return this._config[key];
  }
}

export function ConfigFactory(config: ConfigService) {
  return () => config.load();
}
