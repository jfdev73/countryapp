import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  countries: Country[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  searchByRegion(term: Region) {
    this.selectedRegion = term;
    this.countriesService.searchRegion(term).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
