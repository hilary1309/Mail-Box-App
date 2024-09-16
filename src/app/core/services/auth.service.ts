import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from './token.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  login(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response && response.data.token) {
            this.tokenService.setToken(response.data.token);
          }
          return response;
        })
      );
  }

  logout() {
    return this.http.get(`${apiEndpoint.AuthEndpoint.logout}`).pipe(
      map((res) => {
        if (res) {
          this.tokenService.removeToken();
        }
        return res;
      })
    );
  }
}
