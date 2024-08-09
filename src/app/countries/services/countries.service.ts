import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchCountry(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchRegion(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }
}
