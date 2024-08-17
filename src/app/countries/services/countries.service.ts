import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, count, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';

  cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError((error) => of([]))
      //delay(1000)
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;
    return this.getCountriesRequest(url);
  }

  searchCountry(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${query}`;
    return this.getCountriesRequest(url);
  }
}
