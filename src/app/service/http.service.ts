import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/*If we want to use this service class into another component or 
outside the class then we have to use @Injectable*/
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "http://localhost:9096"

  // Add the HttpClient dependency through constructor
  constructor(private http: HttpClient) { }

  getEmployeeData(): Observable<any>{
    return this.http.get(this.baseUrl + '/getAllDetails')
  }

  addEmployee(body: any): Observable<any> {
    return this.http.post(this.baseUrl + '/addDetails', body);
  }

  deleteEmployeeData(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }

  updateEmployeData(id: number, body: any): Observable<any> {
    return this.http.put(this.baseUrl + "/update/" + id, body);
  }
}
