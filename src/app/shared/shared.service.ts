import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiURL = environment.api;


  constructor(private httpService: HttpClient) { }

  // seviço compartilhado que retorna todos os dados do banco de dados

  get(route: string): Observable<Product> {
    return this.httpService.get<Product>(this.apiURL + `${route}`);
  }

  getProduct(route: string, product: Product) {
    return this.httpService.get<Product>(this.apiURL + route + product);
  }

  post(route: string, data: any): Observable<Product> {
    return this.httpService.post<Product>(this.apiURL + `${route}`, data);
  }

  postWithId(route: string, id: number, data: any): Observable<Product> {
    return this.httpService.post<Product>(this.apiURL + `${route}` + `${id}`, data);
  }

  update(route: string, id: number, data: any): Observable<Product> {
    let routeApi = this.apiURL + route + `${id}`;
    return this.httpService.put<Product>(routeApi, data);
  }

  // delete(route:string, id:number):Observable<any>{
  //   let routeApi = this.apiURL +`${route}` + `${id}`
  //   return this.httpService.request('delete', routeApi);
  // }

  delete(route: string, product: Product): Observable<any> {
    return this.httpService.delete<Product>(this.apiURL + `${route}` +  product);
  }

  find(route: string, id: number): Observable<Product> {
    return this.httpService.get<Product>(this.apiURL + `${route}` + `${id}`)
  }

  getPaginate(route:string, page:number, perPage:number):Observable<any>{
    const params:any = new HttpParams({
      fromObject:{page, perPage}
    })
    // return this.httpService.get(this.apiURL+`${route}`, {params : params ? params : null})
    return this.httpService.get(this.apiURL + route , {params: params});
  }

}