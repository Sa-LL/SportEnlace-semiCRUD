import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  postUser(data: any) {
    return this.http.post<any>('/api/user', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUser() {
    return this.http.get<any>('/api/user').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
