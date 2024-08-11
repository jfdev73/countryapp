import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  isLoading: boolean = false;
  countries: Country[] = [];
  constructor(private countriesService: CountriesService) {}

  searchByCountry(term: string) {
    this.isLoading = true;
    //console.log(term);
    this.countriesService.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
