import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/herto.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  //env de la API/ BACK
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHero(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(querry: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${querry}&_limi=6`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    const { id } = hero;
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
}
