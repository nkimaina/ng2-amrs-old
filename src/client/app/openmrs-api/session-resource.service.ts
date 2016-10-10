import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionResourceService {

  private sessionUrl = 'http://10.7.18.21:8080/api/ws/v1/session';

  constructor(private http: Http) {

  }

  getSession(): Promise<any> {
    return this.http.get(this.sessionUrl)
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        // TODO: Format error to 
        return error;
      });
  }

  deleteSession(): Promise<any> {
    return this.http.delete(this.sessionUrl)
      .toPromise()
      .then((response: Response) => {
        if (response.status === 200) {
          return true;
        }
        throw new Error('An error occured while trying to process the error');
      })
      .catch((error) => {
        // TODO: Format error to 
        return error;
      });
  }

}
