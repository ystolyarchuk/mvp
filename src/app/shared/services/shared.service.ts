import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private dataService: DataService) {}

  public getLevels() {
    return this.dataService.getShare('/service/levelsList');
  }
  public getSkillList() {
    return this.dataService.getShare('/service/skillsList');
  }
  public getCountriesList(query = '') {
    let url = `/service/countriesList`;
    if (query) {
      url += `?q=${query}`;
    }
    return this.dataService.getShare(url);
  }
  public getCitiesList(country, query = '') {
    let url = `/service/citiesList?country=${country}`;
    if (query) {
      url += `&q=${query}`;
    }
    return this.dataService.getShare(url);
  }
}
