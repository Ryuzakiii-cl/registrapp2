import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Region } from '../models/region';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private apiUrl = 'https://dev.matiivilla.cl/duoc/location/';

  constructor(private http: HttpClient) {}

  async getRegion(){
    return await lastValueFrom(this.http.get<ApiResponse<Region>>(`${environment.apiUrl}region`));
  }

  async getComuna(regionId: number){
    return await lastValueFrom(this.http.get<ApiResponse<Region>>(`${environment.apiUrl}comuna/` + regionId));
  }
}
