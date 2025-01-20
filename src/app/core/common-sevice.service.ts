import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';



const apiVersion = 'v2/';
const API_URI = 'foo/';
const baseUrl = `${API_URI}${apiVersion}`;

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {



}
